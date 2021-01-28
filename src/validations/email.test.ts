import email from "./email";

describe(`email validation`, () => {
    const errorMessage = `Invalid email`;

    test(`invalid email`, () => {
        expect(email()(``)).not.toBe(true);
        expect(email()(`calm`)).not.toBe(true);
        expect(email()(`calmid.com`)).not.toBe(true);
        expect(email()(`@calmid.com`)).not.toBe(true);
    });

    test(`invalid email with custom error message`, () => {
        expect(email(errorMessage)(`test@`)).toBe(errorMessage);
        expect(email(errorMessage)(`a@a.a`)).toBe(errorMessage);
        expect(email(errorMessage)(`a@a.a`)).toBe(errorMessage);
    });

    test(`valid email`, () => {
        expect(email()(`a@a.aa`)).toBe(true);
        expect(email()(`abc@def.gh`)).toBe(true);
    });

    test(`valid email with custom error message`, () => {
        expect(email(errorMessage)(`abc+1@def.gh`)).toBe(true);
        expect(email(errorMessage)(`test@calmid.com`)).toBe(true);
    });
});
