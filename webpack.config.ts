import { CleanWebpackPlugin } from "clean-webpack-plugin";
// import CopyPlugin from "copy-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import path from "path";
import { Configuration } from "webpack";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import nodeExternals from "webpack-node-externals";

const webpackConfig: Configuration = {
    mode: `production`,
    devtool: `source-map`,
    experiments: {
        outputModule: true,
    },
    externalsType: `module`,
    externalsPresets: {
        node: true,
    },
    entry: {
        main: `./src/index.ts`,
        utils: `./src/utils/index.ts`,
    },
    output: {
        filename: `[name].js`,
        path: path.resolve(__dirname, `dist`),
        module: true,
        chunkFormat: `module`,
        // libraryTarget: `umd`,
        library: {
            type: `module`,
        },
        environment: {
            module: true,
        },
        // library: {
        //     type: `umd`,
        // },
    },
    optimization: {
        usedExports: true,
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
                test: /\.(woff(2)?|ttf|otf|eot|gif|svg|jpg|png|mp3|mp4)$/,
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
            `.tsx`,
            `.ts`,
            `.jsx`,
            `.js`,
        ],
    },
    plugins: [
        new CleanWebpackPlugin(), new ForkTsCheckerWebpackPlugin(),
        // new BundleAnalyzerPlugin(),
        // new CopyPlugin({
        //     patterns: [
        //         {
        //             from: `src/assets`,
        //             to: `assets`,
        //         },
        //     ],
        // }),
    ],
    // externals: [
    //     nodeExternals({
    //         importType: `umd`,
    //     }),
    // ],
};

export default webpackConfig;
