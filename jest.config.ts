import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    verbose: true,
    preset: `ts-jest`,
    testEnvironment: `jsdom`,
    testPathIgnorePatterns: [ `/node_modules/`, `<rootDir>/example/` ],
    setupFilesAfterEnv: [ `<rootDir>/setupTests.ts` ],
};

export default config;