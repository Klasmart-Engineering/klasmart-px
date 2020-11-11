const path = require("path");

module.exports = {
    mode: "development",
    entry: {
        index: "./src/entry.ts",
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/i,
                exclude: /node_modules/,
                use: {
                    loader: "ts-loader",
                },
            },
            {
                test: /\.(gif|svg|jpg|png)$/,
                loader: "file-loader",
            },
        ],
    },
    resolve: {
        extensions: [".js", ".jsx", ".tsx", ".ts", ".css", ".ttf"],
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "dist"),
    },
};
