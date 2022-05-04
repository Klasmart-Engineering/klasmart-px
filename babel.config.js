module.exports = {
    presets: [
        `@babel/preset-env`,
        [
            `@babel/preset-react`,
            {
                runtime: `automatic`,
            },
        ],
        `@babel/preset-typescript`,
    ],
    plugins: [
        `@babel/plugin-transform-typescript`,
        [
            `@babel/proposal-class-properties`,
            {
                loose: true,
            },
        ],
        `@babel/proposal-object-rest-spread`,
    ],
};
