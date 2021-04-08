import email from "./email";

const tests = (regex: (errorMessage?: string | undefined) => (input: any) => string | true) => describe(`email validation`, () => {
    const errorMessage = `Invalid email`;

    test(`invalid email`, () => {
        expect(regex()(`calm`)).not.toBe(true);
        expect(regex()(`calmid.com`)).not.toBe(true);
        expect(regex()(`@calmid.com`)).not.toBe(true);
    });

    test(`invalid email with custom error message`, () => {
        expect(regex(errorMessage)(`test@`)).toBe(errorMessage);
        expect(regex(errorMessage)(`a@a.a`)).toBe(errorMessage);
        expect(regex(errorMessage)(`a@a.a`)).toBe(errorMessage);
    });

    test(`valid email`, () => {
        expect(regex()(`a@a.aa`)).toBe(true);
        expect(regex()(`abc@def.gh`)).toBe(true);
    });

    test(`valid email with custom error message`, () => {
        expect(regex(errorMessage)(`abc+1@def.gh`)).toBe(true);
        expect(regex(errorMessage)(`test@calmid.com`)).toBe(true);
    });

    test(`empty`, () => {
        expect(regex()(``)).toBe(true);
        expect(regex()(undefined)).toBe(true);
        expect(regex()(null)).toBe(true);
    });
});

tests(email);

export default tests;
