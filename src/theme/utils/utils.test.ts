import { normalizeLocale } from "./utils";

describe(`normalizeLocale`, () => {
    test(`normalizes lowercase language code`, () => {
        expect(normalizeLocale(`en`))
            .toBe(`en`);
    });

    test(`normalizes uppercase language code`, () => {
        expect(normalizeLocale(`EN`))
            .toBe(`en`);
    });

    test(`normalizes language code and country code separated by underscore`, () => {
        expect(normalizeLocale(`en_GB`))
            .toBe(`en`);
    });

    test(`normalizes language code and country code separated by dash`, () => {
        expect(normalizeLocale(`en-GB`))
            .toBe(`en`);
    });
});
