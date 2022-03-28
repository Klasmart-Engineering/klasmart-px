module.exports = {
    extends: [ `@kl-engineering/eslint-config/react`, `@kl-engineering/eslint-config/jest/react` ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: `module`,
        project: `tsconfig.eslint.json`,
    },
};
