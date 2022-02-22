export default (min: number, errorMessage?: string) => (input: any) => {
    let inputMin;
    if (Array.isArray(input)) {
        inputMin = input.length;
    } else if (typeof input === `number`) {
        inputMin = input;
    } else {
        inputMin = String(input.trim()).length;
    }
    return inputMin >= min || (errorMessage ?? `Minimum ${min}`);
};
