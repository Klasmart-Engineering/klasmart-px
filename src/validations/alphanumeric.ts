export const nonAlphanumericRegex = /[^a-zA-Z0-9\s]/;

export default (errorMessage?: string) => (input: any) => !nonAlphanumericRegex.test(input) || (errorMessage ?? `Only alphanumeric characters are valid`);
