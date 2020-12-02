import stringToHslColor from "./stringToHslColor";

describe(`stringToHslColor`, () => {
    test(`generate hsl color by string`, () => {
        expect(stringToHslColor(`Hello`)).toMatch(/hsl\(\d{1,3}, 50%, 60%\)/);
        expect(stringToHslColor(`Some string`, 33, 33)).toMatch(/hsl\(\d{1,3}, 33%, 33%\)/);
        expect(stringToHslColor(`Ok`, -123, -234234)).toMatch(/hsl\(\d{1,3}, 0%, 0%\)/);
        expect(stringToHslColor(`Woop`, 123, 234234)).toMatch(/hsl\(\d{1,3}, 100%, 100%\)/);
    });
});
