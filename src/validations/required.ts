export default (errorMessage?: string) => (input: any) => (input !== null && input !== undefined && String(input).trim() !== ``) || (errorMessage ?? `Required`);
