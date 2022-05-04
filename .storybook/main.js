const path = require('path');
const toPath = (filePath) => path.join(process.cwd(), filePath);

module.exports = {
    "stories": [
        "../src/**/*.stories.mdx",
        "../src/**/*.stories.@(js|jsx|ts|tsx)"
    ],
    "addons": [
        "@storybook/addon-links",
        "@storybook/addon-essentials"
    ],
    "core": {
        "builder": "webpack5"
    },
    webpackFinal: async (config) => {
        const assetRules = config.module.rules.filter(({ test }) => !test.test(".svg"));

        config.module.rules = [
            ...assetRules,
            {
                test: /\.(ico|jpg|jpeg|png|apng|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/,
                loader: 'asset/resource',
                generator: { filename: 'static/media/[path][name].[ext]' }
            },
            {
                test: /\.svg$/,
                use: [ `@svgr/webpack`, `url-loader` ],
            },
        ];

        return {
            ...config,
            resolve: {
                ...config.resolve,
                alias: {
                    ...config.resolve.alias,
                    '@emotion/core': toPath('node_modules/@emotion/react'),
                    'emotion-theming': toPath('node_modules/@emotion/react'),
                },
            },
        };
    },
}