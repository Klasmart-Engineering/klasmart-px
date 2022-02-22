import { emailRegex } from "./email";
import { phoneRegex } from "./phone";

/**
 * Validates if the input is either a valid email or phone number
 *
 * Input starting with `+` assumed to be a phone number, otherwise an email
 * @param {string} [emailErrorMessage] - Error message returned if `input` is an invalid email,
 * or if `phoneErrorMessage` wasn't specified and `input` an invalid phone number
 * @param {string} [phoneErrorMessage] - Error message returned if `input` is an invalid phone
 */
export default (emailErrorMessage?: string, phoneErrorMessage?: string) => (input: any) => {
    if (input === `` || input === undefined || input === null) return true;
    if (input.startsWith(`+`)) {
        if (!phoneRegex.test(input)) {
            return phoneErrorMessage ?? emailErrorMessage ?? `Invalid phone`;
        }
    } else {
        if (!emailRegex.test(input)) {
            return emailErrorMessage ?? `Invalid email`;
        }
    }
    return true;
};
