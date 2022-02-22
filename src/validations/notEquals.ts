import { isEqual } from "lodash";

export default (value: any, errorMessage?: string) => (input: any) => !isEqual(input, value) || (errorMessage ?? `This is an invalid value`);
