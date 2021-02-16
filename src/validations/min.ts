export default (min: number, errorMessage?: string) => (input: any) => (Array.isArray(input) ? input.length : String(input).length) >= min || (errorMessage ?? `Minimum ${min}`);
