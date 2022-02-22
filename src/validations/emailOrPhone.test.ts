import emailTests from "./email.test";
import emailOrPhone from "./emailOrPhone";
import phoneTests from "./phone.test";

describe(`email or phone validation`, () => {
    const emailErrorMessage = `Not an email`;
    const phoneErrorMessage = `Not a phone number`;

    emailTests(emailOrPhone);

    phoneTests(emailOrPhone);

    test(`returns the phoneErrorMessage for an invalid phone if provided`, () => {
        expect(emailOrPhone(emailErrorMessage, phoneErrorMessage)(`+1234`)).toBe(phoneErrorMessage);
    });

    test(`returns the emailErrorMessage for an invalid phone if phoneErrorMessage wasn't provided`, () => {
        expect(emailOrPhone(emailErrorMessage)(`+1234`)).toBe(emailErrorMessage);
    });

    test(`returns the emailErrorMessage for an invalid email`, () => {
        expect(emailOrPhone(emailErrorMessage, phoneErrorMessage)(`not-an-email`)).toBe(emailErrorMessage);
    });
});
