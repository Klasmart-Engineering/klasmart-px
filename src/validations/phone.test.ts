import phone from "./phone";

describe(`phone validation`, () => {
    const errorMessage = `Invalid phone number`;

    test(`invalid phone`, () => {
        expect(phone()(`123`)).not.toBe(true);
        expect(phone()(`1234567890`)).not.toBe(true);
        expect(phone()(`+0821234567890`)).not.toBe(true);
        expect(phone()(`+8212345678901234567890`)).not.toBe(true);
    });

    test(`invalid phone with custom error message`, () => {
        expect(phone(errorMessage)(`123`)).toBe(errorMessage);
        expect(phone(errorMessage)(`1234567890`)).toBe(errorMessage);
        expect(phone(errorMessage)(`+0821234567890`)).toBe(errorMessage);
        expect(phone(errorMessage)(`+8212345678901234567890`)).toBe(errorMessage);
    });

    test(`valid phone`, () => {
        expect(phone()(`+8212345`)).toBe(true);
        expect(phone()(`+8212345678`)).toBe(true);
        expect(phone()(`+82123456789012345`)).toBe(true);
    });

    test(`valid phone with custom error message`, () => {
        expect(phone(errorMessage)(`+8212345`)).toBe(true);
        expect(phone(errorMessage)(`+8212345678`)).toBe(true);
        expect(phone(errorMessage)(`+82123456789012345`)).toBe(true);
    });
});
