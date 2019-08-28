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
		'./kosud -H ./testnet/node%(id)s -E ws://go-kosu-ci-geth:8546' %id,
	]
};

local KosuGeth(name) = Image(name, "kosu-test-geth:latest") {
	ports: [8545, 8546]
};

{
	"kind": "pipeline",
	"name": "tests",
	"steps": [
		Image("prettier_project", "node-lts:latest") {
			"commands": ["yarn prettier:ci"],
		 	"depends_on": ["clone"],
		},

	    Image("build-project", "node-lts:latest") + GethConfig() {
			"commands": [
				"yarn",
				"yarn setup:ci",
				"cd packages/kosu-system-contracts",
				"yarn migrate:ci",
				"WEB3_URI=http://go-kosu-ci-geth:8545 yarn migrate:ci"
			],
			"depends_on": ["clone"]
		},

		Image("npm-tests", "node-lts:latest") + GethConfig() {
			"commands": [ "yarn test:ci" ],
			"depends_on": [ "build-project" ],
		},

		Image("solidity", "node-lts:latest") + GethConfig() {
			"commands": [ "yarn contracts:test:ci" ],
			"depends_on": [ "build-project" ],
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
		"event": [ "pull_request" ]
	},
}