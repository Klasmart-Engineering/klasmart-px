export default (min: number, errorMessage?: string) => (input: any) => String(input).length >= min || (errorMessage ?? `Input needs to be minimum ${min} characters`);
