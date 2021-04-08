export const alphanumericRegex = /^\w*$/;

export default (errorMessage?: string) => (input: any) => alphanumericRegex.test(input ?? ``) || (errorMessage ?? `Only alphanumeric characters are valid`);
