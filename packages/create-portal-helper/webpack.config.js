module.exports = {
    entry: __dirname + "/lib/index.js",
    output: {
        path: __dirname + "/lib",
        filename: "main.js",
        libraryTarget: "var",
        library: "Create",
    },
    devServer: {
        contentBase: __dirname + "/lib",
        compress: true,
        port: 8000,
    },
};
