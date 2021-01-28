import required from "./required";

describe(`required validation`, () => {
    const errorMessage = `Required input`;

    test(`empty values`, () => {
        expect(required()(null)).not.toBe(true);
        expect(required()(undefined)).not.toBe(true);
        expect(required()(``)).not.toBe(true);
    });

    test(`empty vaules with custom error message`, () => {
        expect(required(errorMessage)(null)).toBe(errorMessage);
        expect(required(errorMessage)(undefined)).toBe(errorMessage);
        expect(required(errorMessage)(``)).toBe(errorMessage);
    });

    test(`non-empty values`, () => {
        expect(required()(`Hello`)).toBe(true);
        expect(required()(123)).toBe(true);
        expect(required()(0)).toBe(true);
    });

    test(`non-empty values with custom error message`, () => {
        expect(required(errorMessage)(`Hello`)).toBe(true);
        expect(required(errorMessage)(123)).toBe(true);
        expect(required(errorMessage)(0)).toBe(true);
    });
});
