import min from "./min";

describe(`min validation`, () => {
    const count = 5;
    const errorMessage = `Input needs to be maximum ${count} characters`;

    test(`less than min`, () => {
        expect(min(count)(`hi`)).not.toBe(true);
        expect(min(count)(`not`)).not.toBe(true);
        expect(min(count)(`nice`)).not.toBe(true);
        expect(min(count)(1)).not.toBe(true);
    });

    test(`less than min with custom error message`, () => {
        expect(min(count, errorMessage)(`wut`)).toBe(errorMessage);
        expect(min(count, errorMessage)(`this`)).toBe(errorMessage);
        expect(min(count, errorMessage)(`is`)).toBe(errorMessage);
        expect(min(count, errorMessage)(`wack`)).toBe(errorMessage);
    });

    test(`min or more`, () => {
        expect(min(count)(`Hello!`)).toBe(true);
        expect(min(count)(12345)).toBe(true);
    });

    test(`min or more with custom error message`, () => {
        expect(min(count, errorMessage)(`short`)).toBe(true);
        expect(min(count, errorMessage)(`and sweet`)).toBe(true);
    });
});
