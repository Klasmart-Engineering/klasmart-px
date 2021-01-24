import stringToColor from "./stringToColor";

describe(`stringToColor`, () => {
    test(`generate hex color by string`, () => {
        const hexRegex = /#[A-F\d]{6}/;
        expect(stringToColor(`Hello`)).toMatch(hexRegex);
        expect(stringToColor(`Some string`, {
            saturation: 33,
            light: 33,
        })).toMatch(hexRegex);
        expect(stringToColor(`Some string`, {
            saturation: 33,
            light: 33,
            output: `hex`,
        })).toMatch(hexRegex);
        expect(stringToColor(`Ok`, {
            saturation: -123,
            light: -234234,
        })).toMatch(hexRegex);
        expect(stringToColor(`Woop`, {
            saturation: 123,
            light: 234234,
            output: `hex`,
        })).toMatch(hexRegex);
    });

    test(`generate hsl color by string`, () => {
        expect(stringToColor(`Hello`, {
            output: `hsl`,
        })).toMatch(/hsl\(\d{1,3}, 50%, 60%\)/);
        expect(stringToColor(`Some string`, {
            saturation: 33,
            light: 33,
            output: `hsl`,
        })).toMatch(/hsl\(\d{1,3}, 33%, 33%\)/);
        expect(stringToColor(`Ok`, {
            saturation: -123,
            light: -234234,
            output: `hsl`,
        })).toMatch(/hsl\(\d{1,3}, 0%, 0%\)/);
        expect(stringToColor(`Woop`, {
            saturation: 123,
            light: 234234,
            output: `hsl`,
        })).toMatch(/hsl\(\d{1,3}, 100%, 100%\)/);
    });

    test(`generate rgb color by string`, () => {
        const rgbRegex = /rgba\(\d{1,3}, \d{1,3}, \d{1,3}, 1\)/;
        expect(stringToColor(`Hello`, {
            output: `rgb`,
        })).toMatch(rgbRegex);
        expect(stringToColor(`Some string`, {
            saturation: 33,
            light: 33,
            output: `rgb`,
        })).toMatch(rgbRegex);
        expect(stringToColor(`Ok`, {
            saturation: -123,
            light: -234234,
            output: `rgb`,
        })).toMatch(rgbRegex);
        expect(stringToColor(`Woop`, {
            saturation: 123,
            light: 234234,
            output: `rgb`,
        })).toMatch(rgbRegex);
    });
});
