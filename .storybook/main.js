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
    staticDirs: [ `../src/assets`, `../public`, `../static`, `../assets/fonts/SourceSansPro` ],
    webpackFinal: async (config) => {
        const nonSvgAssetRules = config.module.rules.filter(({ test }) => !test.test("svg"));

        config.module.rules = [
            ...nonSvgAssetRules,
            {
                test: /\.(ico|jpg|jpeg|png|apng|gif|eot|cur|ani|pdf)(\?.*)?$/,
                loader: 'asset/resource',
                generator: { filename: 'static/media/[path][name].[ext]' }
            },
            {
                test: /\.svg$/,
                use: [ `@svgr/webpack`, `url-loader` ],
            },
            {
                test: /\.(eot|otf|webp|ttf|woff|woff2)$/i,
                type: 'asset/resource',
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