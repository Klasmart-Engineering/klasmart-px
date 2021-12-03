import { Validator } from "../";

export const VALIDATION_FAILED_MESSAGE = `Validation Failed`;

export const passingValidation: Validator = (input: unknown) => true;

export const failingValidation: Validator = (input: unknown) => VALIDATION_FAILED_MESSAGE;
