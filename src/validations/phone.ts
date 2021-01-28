export const phoneRegex = /^\+[1-9]\d{0,2}\d{6,14}$/;

export default (errorMessage?: string) => (input: any) => phoneRegex.test(input) || (errorMessage ?? `Invalid phone number`);
