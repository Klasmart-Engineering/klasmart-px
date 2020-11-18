const path = require(`path`);

module.exports = {
    mode: `development`,
    entry: {
        index: `./src/entry.ts`,
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/i,
                exclude: /node_modules/,
                use: {
                    loader: `babel-loader`,
                },
            },
            {
                test: /\.css$/i,
                use: [
                    {
                        loader: `style-loader`,
                    },
                    `css-modules-typescript-loader`,
                    {
                        loader: `css-loader`,
                        options: {
                            modules: true,
                        },
                    },
                ],
            },
            {
                test: /\.(woff(2)?|ttf|otf|eot|gif|svg|jpg|png)$/,
                loader: `file-loader`,
            },
        ],
    },
    resolve: {
        extensions: [
            `.js`,
            `.jsx`,
            `.tsx`,
            `.ts`,
            `.css`,
            `.ttf`,
        ],
    },
    output: {
        filename: `[name].js`,
        path: path.resolve(__dirname, `dist`),
    },
    devServer: {
        contentBase: path.resolve(__dirname, `dist`),
        publicPath: `/assets`, //should provide the path of the served js , img , etc...
    },
};
