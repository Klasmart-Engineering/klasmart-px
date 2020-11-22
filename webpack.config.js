const path = require(`path`);
const glob = require(`glob`);
const { CleanWebpackPlugin } = require(`clean-webpack-plugin`);

module.exports = {
    mode: `development`,
    target: `node`,
    entry: glob.sync(`./src/**/*.{ts,tsx}`).reduce((acc, file) => {
        acc[file.replace(/^\.\/src\//, ``)] = file;
        return acc;
    }, {}),
    output: {
        filename: `[name].js`,
        path: __dirname + `/dist`,
    },
    module: {
        rules: [
            {
                test: /\.(j|t)sx?$/i,
                exclude: /node_modules/,
                use: {
                    loader: `babel-loader`,
                },
            },
            {
                test: /\.(j|t)sx?$/i,
                exclude: /node_modules/,
                use: {
                    loader: `ts-loader`,
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
                options: {
                    name: `[path][name].[ext]`,
                    context: `src`,
                },
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
    plugins: [ new CleanWebpackPlugin() ],
    devServer: {
        contentBase: path.resolve(__dirname, `dist`),
        publicPath: `/assets`, //should provide the path of the served js , img , etc...
    },
};
