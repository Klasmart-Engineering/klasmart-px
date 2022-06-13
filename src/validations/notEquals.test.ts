import notEquals from "./notEquals";

describe(`equals validation`, () => {
    const errorMessage = `This value cannot be used`;
    const equalityStringValue = `Hello`;
    const equalityNumberValue = 123;

    test(`equals`, () => {
        expect(notEquals(equalityStringValue)(`Hello`)).not.toBe(true);
        expect(notEquals(equalityNumberValue)(123)).not.toBe(true);
    });

    test(`equals with custom error message`, () => {
        expect(notEquals(equalityStringValue, errorMessage)(`Hello`))
            .toBe(errorMessage);
        expect(notEquals(equalityNumberValue, errorMessage)(123))
            .toBe(errorMessage);
    });

    test(`not equals`, () => {
        expect(notEquals(equalityStringValue)(`hello`))
            .toBe(true);
        expect(notEquals(equalityStringValue)(`Bye`))
            .toBe(true);
        expect(notEquals(equalityNumberValue)(`123`))
            .toBe(true);
        expect(notEquals(equalityNumberValue)(234))
            .toBe(true);
    });

    test(`not equals with custom error message`, () => {
        expect(notEquals(equalityStringValue, errorMessage)(`hello`))
            .toBe(true);
        expect(notEquals(equalityStringValue, errorMessage)(`Bye`))
            .toBe(true);
        expect(notEquals(equalityNumberValue, errorMessage)(`123`))
            .toBe(true);
        expect(notEquals(equalityNumberValue, errorMessage)(234))
            .toBe(true);

    });
});
