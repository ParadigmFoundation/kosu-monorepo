local Image(name, image) = {
	name: name,
	image: "gcr.io/kosu-io/" + image,
	pull: "always"
};

local GethConfig() = {
	environment: {
		WEB3_URI: "http://kosu-geth:8545",
		WEB3_URI_WS: "ws://kosu-geth:8546",
	}
};

local KosuNode(id) = Image("kosu-node-"+id, "go-kosu-ci:latest") {
	detach: true,
	depends_on: ["build-project"],
	commands: [
		"cd packages/go-kosu",
		'./kosud start -H ./testnet/node%(id)s -E ws://go-kosu-ci-geth:8546' %id,
	]
};

local KosuGeth(name) = Image(name, "kosu-test-geth:latest") {
	ports: [8545, 8546]
};

[{
	"kind": "pipeline",
	"name": "tests",
	"steps": [
		Image("prettier_project", "node-ci:latest") {
			"commands": ["yarn prettier:ci"]
		},

	    Image("build-project", "node-ci:latest") + GethConfig() {
			"commands": [
				"yarn",
				"yarn setup:ci",
				"yarn migrate:ci",
				"WEB3_URI=http://go-kosu-ci-geth:8545 yarn migrate:ci"
			]
		},

        Image("npm-tests", "node-ci:latest") + GethConfig() {
            "commands": [ "yarn test:ci" ],
            "depends_on": [ "build-project" ],
        },

        Image("solidity", "node-ci:latest") + GethConfig() {
            "commands": [ "yarn contracts:test:ci" ],
            "depends_on": [ "build-project", "npm-tests" ],
        },

        KosuNode(0), KosuNode(1), KosuNode(2), KosuNode(3),

        Image("go-kosu", "go-kosu-ci:latest") {
                "commands": [
                "cd packages/go-kosu",
                "export KOSU_TEST_NODES=$(pwd)/testnet/node0@kosu-node-1:26657,$(pwd)/testnet/node1@kosu-node-1:26657,$(pwd)/testnet/node2@kosu-node-1:26657,$(pwd)/testnet/node3@kosu-node-1:26657",
                "make ci"
            ],
            "depends_on": ["build-project", "kosu-node-0", "kosu-node-1","kosu-node-2","kosu-node-3"]
        },
    ],

    "services": [
        KosuGeth("kosu-geth"),
        KosuGeth("go-kosu-ci-geth"),
    ],

    "trigger": {
        "event": [ "pull_request", "tag" ]
    },
},
{
    "kind": "pipeline",
    "name": "release",
    "trigger": {
        "event": [ "tag" ],
    },
	"depends_on": [ "tests" ],
    "steps": [
        Image("yarn", "node-ci:latest") {
            "pull": "always",
            "commands": [
                "yarn",
                "yarn build",
                "yarn prettier",
                "npm-cli-login",
                "git checkout .",
                "yarn lerna publish from-package --yes" 
			],
            "environment": {
                "NPM_USER": { "from_secret": "npm_user" },
                "NPM_EMAIL": { "from_secret": "npm_email" },
                "NPM_PASS": { "from_secret": "npm_password" },

            },
        },
		Image("gorelease", "go-kosu") {
			commands: [
				"git fetch --tags",
				"cd ./packages/go-kosu",
				"curl -sL https://git.io/goreleaser | bash -s -- --skip-validate"
			],
			environment: {
				"GITHUB_TOKEN": { "from_secret": "github_token"  },
			},
			depends_on: [ "yarn" ],
			when: { ref: { include: ["refs/tags/@kosu/go-kosu*"] } },
		},
		{
			name: "docker",
			image: "plugins/gcr",
			depends_on: [ "gorelease" ],
			settings: {
				registry: "gcr.io",
				repo: "kosu-test-network/go-kosu",
				dockerfile: "./packages/go-kosu/Dockerfile.binaries",
				context: "./packages/go-kosu",
				json_key: {
					from_secret: "google_credentials"
				},
				tags: [
					"latest",
				]
			},
			when: { ref: { include: ["refs/tags/@kosu/go-kosu*"] } },
		},
		{
			name: "deploy",
			image: "appleboy/drone-ssh",
			depends_on: [ "docker" ],
			settings: {
				# Host is the IP address of CI machine @ kosu-test-network project from GCP
				host: "34.68.74.152",
				username: "ci",
				key: {
					from_secret: "ssh_ci_key"
				},
				script: [
					"docker run --rm -d gcr.io/kosu-test-network/go-kosu kosud start"
				]
			},
			when: { ref: { include: ["refs/tags/@kosu/go-kosu*"] } },
		}
    ],
}]
