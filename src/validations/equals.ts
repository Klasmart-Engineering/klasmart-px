import { isEqual } from "lodash";

export default (value: any, errorMessage?: string) => (input: any) => isEqual(input, value) || (errorMessage ?? `The values don't match`);
