import equals from "./equals";

describe(`equals validation`, () => {
    const errorMessage = `Values are not equal`;
    const equalityStringValue = `Hello`;
    const equalityNumberValue = 123;

    test(`not equals`, () => {
        expect(equals(equalityStringValue)(`hello`)).not.toBe(true);
        expect(equals(equalityStringValue)(`Bye`)).not.toBe(true);
        expect(equals(equalityNumberValue)(`123`)).not.toBe(true);
        expect(equals(equalityNumberValue)(234)).not.toBe(true);
    });

    test(`not equals with custom error message`, () => {
        expect(equals(equalityStringValue, errorMessage)(`hello`))
            .toBe(errorMessage);
        expect(equals(equalityStringValue, errorMessage)(`Bye`))
            .toBe(errorMessage);
        expect(equals(equalityNumberValue, errorMessage)(`123`))
            .toBe(errorMessage);
        expect(equals(equalityNumberValue, errorMessage)(234))
            .toBe(errorMessage);
    });

    test(`equals`, () => {
        expect(equals(equalityStringValue)(`Hello`))
            .toBe(true);
        expect(equals(equalityNumberValue)(123))
            .toBe(true);
    });

    test(`equals with custom error message`, () => {
        expect(equals(equalityStringValue, errorMessage)(`Hello`))
            .toBe(true);
        expect(equals(equalityNumberValue, errorMessage)(123))
            .toBe(true);
    });
});
