import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    verbose: false,
    preset: `ts-jest`,
    testEnvironment: `jsdom`,
    testPathIgnorePatterns: [ `/node_modules/` ],
    setupFilesAfterEnv: [ `<rootDir>/setupTests.ts` ],
    maxWorkers: `50%`,
    moduleNameMapper: {
        "^lodash-es$": `lodash`,
    },
};

export default config;
