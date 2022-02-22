export const phoneRegex = /^\+[1-9]\d{6,14}$/;

export default (errorMessage?: string) => (input: any) => {
    if (input === `` || input === undefined || input === null) return true;
    return phoneRegex.test(input) || (errorMessage ?? `Invalid phone number`);
};
