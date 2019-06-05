module.exports = {
    entry: __dirname + "/src/index.js",
    output: {
        path: __dirname + "/dist",
        filename: "main.js",
        libraryTarget: "var",
        library: "Create",
    },
    devServer: {
        contentBase: __dirname + "/dist",
        compress: true,
        port: 8000,
    },
};
