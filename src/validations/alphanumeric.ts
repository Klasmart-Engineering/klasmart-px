export const alphanumericRegex = /^[^\W_]*$/;

export default (errorMessage?: string) => (input: any) => alphanumericRegex.test(input ?? ``) || (errorMessage ?? `Only alphanumeric characters are valid`);
