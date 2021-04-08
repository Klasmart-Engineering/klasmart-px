export const letternumericRegex = /^[\p{L}\d &/,-]*$/gu;

export default (errorMessage?: string) => (input: any) => {
    return letternumericRegex.test(input ?? ``)
        || (typeof input === `string`
            ? letternumericRegex.test(input.normalize(`NFD`)) || letternumericRegex.test(input.normalize(`NFC`))
            : false)
        || (errorMessage ?? `Only alphanumeric characters are valid`);
};
