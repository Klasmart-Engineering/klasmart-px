import { isEqual } from "lodash-es";

export default (value: any, errorMessage?: string) => (input: any) => isEqual(input, value) || (errorMessage ?? `The values don't match`);
