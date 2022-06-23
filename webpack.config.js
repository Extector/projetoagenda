//Todo arquivo JS no Node é um módulo

const path = require("path"); // Node usa CommonJS --> Padrão do Node

module.exports = {
    mode: "development",
    entry: "./frontend/main.js",
    output: {
        path: path.resolve(__dirname, "public", "assets", "js"),
        filename: "bundle.js",
    },
    module: {
        rules: [
            {
                exclude: /node_modules/,
                test: /\.js$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/env"],
                    },
                },
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.s[ac]ss$/i,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
        ],
    },
    devtool: "source-map",
};
