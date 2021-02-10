import max from "./max";

describe(`max validation`, () => {
    const count = 10;
    const errorMessage = `Input needs to be maximum ${count} characters`;

    test(`more than max`, () => {
        expect(max(count)(`hello there`)).not.toBe(true);
        expect(max(count)(`General Kenobi`)).not.toBe(true);
        expect(max(count)(`Sven Svensson`)).not.toBe(true);
        expect(max(count)(12345678901)).not.toBe(true);
    });

    test(`more than max with custom error message`, () => {
        expect(max(count, errorMessage)(`longer text`)).toBe(errorMessage);
        expect(max(count, errorMessage)(`this should fail`)).toBe(errorMessage);
        expect(max(count, errorMessage)(`and so should this`)).toBe(errorMessage);
        expect(max(count, errorMessage)(`qwertyuiop!`)).toBe(errorMessage);
    });

    test(`max or less`, () => {
        expect(max(count)(`Hello!`)).toBe(true);
        expect(max(count)(123)).toBe(true);
    });

    test(`max or less with custom error message`, () => {
        expect(max(count, errorMessage)(`short`)).toBe(true);
        expect(max(count, errorMessage)(`and sweet`)).toBe(true);
    });
});
