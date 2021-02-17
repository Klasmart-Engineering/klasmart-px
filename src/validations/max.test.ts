import max from "./max";

describe(`max validation`, () => {
    const maximum = 5;
    const errorMessage = `Input needs to be maximum ${maximum}`;
    const moreThanMaxArr = [ ...Array(maximum + 1).keys() ];
    const maxArr = moreThanMaxArr.slice(0, moreThanMaxArr.length - 1);
    const lessThanMaxArr = maxArr.slice(0, maxArr.length - 1);

    test(`more than max`, () => {
        expect(max(maximum)(moreThanMaxArr.join(``))).not.toBe(true);
        expect(max(maximum)(moreThanMaxArr)).not.toBe(true);
        expect(max(maximum)(maximum + 1)).not.toBe(true);
    });

    test(`more than max with custom error message`, () => {
        expect(max(maximum, errorMessage)(moreThanMaxArr.join(``))).toBe(errorMessage);
        expect(max(maximum, errorMessage)(moreThanMaxArr)).toBe(errorMessage);
        expect(max(maximum, errorMessage)(maximum + 1)).toBe(errorMessage);
    });

    test(`max or less`, () => {
        expect(max(maximum)(maxArr.join(``))).toBe(true);
        expect(max(maximum)(lessThanMaxArr.join(``))).toBe(true);
        expect(max(maximum)(maxArr)).toBe(true);
        expect(max(maximum)(lessThanMaxArr)).toBe(true);
        expect(max(maximum)(maximum)).toBe(true);
        expect(max(maximum)(maximum - 1)).toBe(true);
    });

    test(`max or less with custom error message`, () => {
        expect(max(maximum, errorMessage)(maxArr.join(``))).toBe(true);
        expect(max(maximum, errorMessage)(lessThanMaxArr.join(``))).toBe(true);
        expect(max(maximum, errorMessage)(maxArr)).toBe(true);
        expect(max(maximum, errorMessage)(lessThanMaxArr)).toBe(true);
        expect(max(maximum, errorMessage)(maximum)).toBe(true);
        expect(max(maximum, errorMessage)(maximum - 1)).toBe(true);
    });
});
