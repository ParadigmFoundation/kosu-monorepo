var path = require("path");

module.exports = {
    //...
    devServer: {
        contentBase: path.join(__dirname, "public"),
        compress: true,
        port: 8000,
    },
};
