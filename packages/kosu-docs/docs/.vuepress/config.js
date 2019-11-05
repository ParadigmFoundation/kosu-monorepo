const fs = require("fs");

const sidebar = [
    {
        title: "Kosu Overview",
        collapsable: true,
        children: [
            "./",
            "./overview/",
            "./overview/token-mechanics",
            "./overview/validator-curation",
            "./overview/validator-application",
            "./overview/contributing",
        ],
    },
];

const rootDir = `${__dirname}/..`;

const orderedBasePackages = ["kosu-system-contracts", "go-kosu", "kosu-wrapper-enhancements", "kosu-node-client", "kosu-migrations", "kosu-genesis-cli"];
const directoryPackages = fs.readdirSync(rootDir);
const packages = new Set([...orderedBasePackages, ...directoryPackages]);

for (const pckage of packages) {
    if ([".vuepress", "README.md", "overview"].includes(pckage)) {
        continue;
    }
    const title = pckage
        .toLowerCase()
        .split("-")
        .map(e => e[0].toUpperCase() + e.slice(1))
        .join(" ");
    const base = {
        title,
        collapsable: true,
        children: [],
    };

    const packageDocs = fs.readdirSync(`${rootDir}/${pckage}`);

    for (const file of packageDocs) {
        switch (file) {
            case "README.md":
                base.children.push(`./${pckage}/`);
                continue;
            case "globals.md":
                base.children.push(`./${pckage}/globals`);
                continue;
            case "classes":
                const classes = fs.readdirSync(`${rootDir}/${pckage}/classes`);
                for (const clas of classes) {
                    console.log(clas);
                    base.children.push(`./${pckage}/classes/${clas.split(".")[0]}`);
                }
                continue;
            default:
                base.children.push(`./${pckage}/${file.split(".")[0]}`);
                break;
        }
    }
    sidebar.push(base);
}

module.exports = {
    plugins: [
        [
            "@vuepress/google-analytics",
            {
                ga: "UA-121297415-3            ", // UA-00000000-0
            },
        ],
    ],
    title: "Kosu Docs",
    head: [
        ["link", { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" }],
        ["link", { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" }],
        ["link", { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" }],
        ["link", { rel: "manifest", href: "/site.webmanifest" }],
        ["link", { rel: "mask-icon", href: "/safari-pinned-tab.svg", color: "#2b5797" }],
        // ['link', { rel: "preload", type: "font/otf", as: "font", crossorigin: "anonymous", href: "/Gilroy-Medium.otf" }],
        ["meta", { name: "msapplication-TileColor", content: "#2b5797" }],
        ["meta", { name: "theme-color", content: "#ffffff" }],
    ],
    description: "Kosu Documentation and Reference",
    base: "/",
    themeConfig: {
        logo: "/docs-logo.png",
        editLinks: true,
        editLinkText: "View source on GitHub",
        lastUpdated: true,
        sidebarDepth: 3,
        docsRepo: "ParadigmFoundation/kosu-monorepo",
        docsDir: "docs",
        nav: [{ text: "Home", link: "https://paradigm.market/" }],
        sidebar,
    },
};
