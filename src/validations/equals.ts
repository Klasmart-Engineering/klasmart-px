export default (value: any, errorMessage?: string) => (input: any) => input === value || (errorMessage ?? `The values don't match`);
