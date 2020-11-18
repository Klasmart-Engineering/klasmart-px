module.exports = {
    env: {
        commonjs: true,
        es6: true,
        node: true,
    },
    plugins: [ `react`, `@typescript-eslint` ],
    extends: [
        `eslint:recommended`,
        `plugin:react/recommended`,
        `plugin:@typescript-eslint/eslint-recommended`,
        `plugin:@typescript-eslint/recommended`,
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 2018,
        sourceType: `module`,
    },
    parser: `@typescript-eslint/parser`,
    rules: {
        'no-console': process.env.NODE_ENV === `production` ? `error` : `off`,
        'react/react-in-jsx-scope': `off`,
        'react/jsx-max-props-per-line': 2,
        'react/jsx-first-prop-new-line': 2,
        'react/display-name': `off`,
        '@typescript-eslint/explicit-module-boundary-types': `off`,
        '@typescript-eslint/no-unused-vars': 1,
        '@typescript-eslint/no-var-requires': `off`,
        '@typescript-eslint/quotes': [ `error`, `backtick` ],
        '@typescript-eslint/member-delimiter-style': [
            2,
            {
                multiline: {
                    delimiter: `semi`,
                    requireLast: true,
                },
                singleline: {
                    delimiter: `semi`,
                    requireLast: false,
                },
            }
        ],
        '@typescript-eslint/no-explicit-any': [
            `off`,
            {
                fixToUnknown: false,
                ignoreRestArgs: false,
            }
        ],
        'array-bracket-newline': [
            `error`,
            {
                multiline: true,
                minItems: 3,
            }
        ],
        'array-element-newline': [
            `error`,
            {
                multiline: true,
                minItems: 3,
            }
        ],
        'array-bracket-spacing': [ `error`, `always` ],
        'comma-dangle': [
            `error`,
            {
                arrays: `only-multiline`,
                exports: `only-multiline`,
                functions: `only-multiline`,
                imports: `only-multiline`,
                objects: `only-multiline`,
            }
        ],
        'linebreak-style': [ `error`, `unix` ],
        'no-trailing-spaces': `error`,
        'no-multiple-empty-lines': [
            `error`,
            {
                max: 1,
                maxEOF: 0,
            }
        ],
        'object-curly-spacing': [ `error`, `always` ],
        'object-curly-newline': [
            `error`,
            {
                ObjectExpression: {
                    multiline: true,
                    minProperties: 1,
                },
                ObjectPattern: {
                    multiline: true,
                    minProperties: 3,
                },
                ImportDeclaration: {
                    multiline: true,
                    minProperties: 3,
                },
                ExportDeclaration: {
                    multiline: true,
                    minProperties: 3,
                },
            }
        ],
        'object-property-newline': `error`,
        'quote-props': [ `error`, `as-needed` ],
        indent: [ `error`, 4 ],
        semi: [ `error`, `always` ],
    },
};
