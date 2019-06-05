var path = require("path");

module.exports = {
    entry: __dirname + "/src/index.js",
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
