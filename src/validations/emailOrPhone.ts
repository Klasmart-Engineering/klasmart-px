import { emailRegex } from "./email";
import { phoneRegex } from "./phone";

export default (errorMessage?: string) => (input: any) => {
    if (input === `` || input === undefined || input === null) return true;
    const validEmail = emailRegex.test(input);
    const validPhone = phoneRegex.test(input);
    if (!validEmail && !validPhone) return errorMessage ?? `Invalid email or phone number`;
    return true;
};
