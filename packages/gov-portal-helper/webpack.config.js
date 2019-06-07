var path = require("path");

module.exports = {
    entry: __dirname + "/lib/index.js",
    output: {
        path: __dirname + "/dist",
        filename: "main.js",
        libraryTarget: "var",
        library: "Gov",
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 8001,
    },
};
