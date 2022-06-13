import phone from "./phone";

const tests = (regex: (errorMessage?: string | undefined) => (input: any) => string | true) => describe(`phone validation`, () => {
    const errorMessage = `Invalid phone number`;

    test(`invalid phone`, () => {
        expect(regex()(`123`)).not.toBe(true);
        expect(regex()(`1234567890`)).not.toBe(true);
        expect(regex()(`+0821234567890`)).not.toBe(true);
        expect(regex()(`+8212345678901234567890`)).not.toBe(true);
        expect(regex()(`++82123456789012`)).not.toBe(true);
        expect(regex()(`+8212345678901234`)).not.toBe(true);
    });

    test(`invalid phone with custom error message`, () => {
        expect(regex(errorMessage)(`123`))
            .toBe(errorMessage);
        expect(regex(errorMessage)(`1234567890`))
            .toBe(errorMessage);
        expect(regex(errorMessage)(`+0821234567890`))
            .toBe(errorMessage);
        expect(regex(errorMessage)(`+8212345678901234567890`))
            .toBe(errorMessage);
    });

    test(`valid phone`, () => {
        expect(regex()(`+8212345`))
            .toBe(true);
        expect(regex()(`+8212345678`))
            .toBe(true);
        expect(regex()(`+821234567890123`))
            .toBe(true);
    });

    test(`valid phone with custom error message`, () => {
        expect(regex(errorMessage)(`+8212345`))
            .toBe(true);
        expect(regex(errorMessage)(`+8212345678`))
            .toBe(true);
        expect(regex(errorMessage)(`+821234567890123`))
            .toBe(true);
    });

    test(`empty`, () => {
        expect(regex()(``))
            .toBe(true);
        expect(regex()(undefined))
            .toBe(true);
        expect(regex()(null))
            .toBe(true);
    });
});

tests(phone);

// eslint-disable-next-line jest/no-export
export default tests;
