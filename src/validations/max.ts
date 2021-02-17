export default (max: number, errorMessage?: string) => (input: any) => {
    let inputMax;
    if (Array.isArray(input)) {
        inputMax = input.length;
    } else if (typeof input === `number`) {
        inputMax = input;
    } else {
        inputMax = String(input).length;
    }
    return inputMax <= max || (errorMessage ?? `Maximum ${max}`);
};
