export default (max: number, errorMessage?: string) => (input: any) => (Array.isArray(input) ? input.length : String(input).length) <= max || (errorMessage ?? `Maximum ${max}`);
