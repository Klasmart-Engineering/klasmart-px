import min from "./min";

describe(`min validation`, () => {
    const minimum = 5;
    const errorMessage = `Input needs to be minimum ${minimum}`;
    const moreThanMinArr = [ ...Array(minimum + 1).keys() ];
    const minArr = moreThanMinArr.slice(0, moreThanMinArr.length - 1);
    const lessThanMinArr = minArr.slice(0, minArr.length - 1);

    test(`less than min`, () => {
        expect(min(minimum)(lessThanMinArr.join(``))).not.toBe(true);
        expect(min(minimum)(lessThanMinArr)).not.toBe(true);
        expect(min(minimum)(minimum - 1)).not.toBe(true);
    });

    test(`less than min with custom error message`, () => {
        expect(min(minimum, errorMessage)(lessThanMinArr.join(``))).toBe(errorMessage);
        expect(min(minimum, errorMessage)(lessThanMinArr)).toBe(errorMessage);
        expect(min(minimum, errorMessage)(minimum - 1)).toBe(errorMessage);
    });

    test(`min or more`, () => {
        expect(min(minimum)(minArr.join(``))).toBe(true);
        expect(min(minimum)(moreThanMinArr.join(``))).toBe(true);
        expect(min(minimum)(minArr)).toBe(true);
        expect(min(minimum)(moreThanMinArr)).toBe(true);
        expect(min(minimum)(minimum)).toBe(true);
        expect(min(minimum)(minimum + 1)).toBe(true);
    });

    test(`min or more with custom error message`, () => {
        expect(min(minimum, errorMessage)(minArr.join(``))).toBe(true);
        expect(min(minimum, errorMessage)(moreThanMinArr.join(``))).toBe(true);
        expect(min(minimum, errorMessage)(minArr)).toBe(true);
        expect(min(minimum, errorMessage)(moreThanMinArr)).toBe(true);
        expect(min(minimum, errorMessage)(minimum)).toBe(true);
        expect(min(minimum, errorMessage)(minimum + 1)).toBe(true);
    });
});
