export default (max: number, errorMessage?: string) => (input: any) => String(input).length <= max || (errorMessage ?? `Input needs to be maximum ${max} characters`);
