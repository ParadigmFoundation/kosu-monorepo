var path = require("path");

module.exports = {
    output: {
        path: __dirname + "/public",
        filename: "main.js",
    },
    devServer: {
        contentBase: path.join(__dirname, "public"),
        compress: true,
        port: 8000,
    },
};
