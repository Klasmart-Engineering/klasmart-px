const path = require(`path`);
const { CleanWebpackPlugin } = require(`clean-webpack-plugin`);
const CopyPlugin = require(`copy-webpack-plugin`);
const ForkTsCheckerWebpackPlugin = require(`fork-ts-checker-webpack-plugin`);
const nodeExternals = require(`webpack-node-externals`);

module.exports = {
    mode: `production`,
    target: `node`,
    entry: {
        main: `./src/index.ts`,
        utils: `./src/utils/index.ts`,
    },
    output: {
        filename: `[name].js`,
        path: path.resolve(__dirname, `dist`),
        libraryTarget: `umd`,
        library: `@kl-engineering/kidsloop-px`,
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
                test: /\.css$/i,
                use: [
                    {
                        loader: `style-loader`,
                    },
                    {
                        loader: `css-modules-typescript-loader`,
                    },
                    {
                        loader: `css-loader`,
                        options: {
                            modules: true,
                        },
                    },
                ],
            },
            {
                test: /\.(woff(2)?|ttf|otf|eot|gif|jpg|png|mp3|mp4)$/,
                loader: `file-loader`,
                options: {
                    name: `[path][name].[ext]`,
                    context: `src`,
                },
            },
            {
                test: /\.svg$/,
                use: [ `@svgr/webpack`, `url-loader` ],
            },
        ],
    },
    resolve: {
        extensions: [
            `.js`,
            `.ts`,
            `.jsx`,
            `.tsx`,
        ],
    },
    plugins: [
        new CleanWebpackPlugin(), new ForkTsCheckerWebpackPlugin(),
        // new CopyPlugin({
        //     patterns: [
        //         {
        //             from: `src/assets`,
        //             to: `assets`,
        //         },
        //     ],
        // }),
    ],
    externals: [ nodeExternals() ],
};
