import afterDate from './afterDate';
import alphanumeric from './alphanumeric';
import beforeDate from './beforeDate';
import email from './email';
import emailOrPhone from './emailOrPhone';
import equals from './equals';
import letternumeric from './letternumeric';
import max from './max';
import min from './min';
import notEquals from './notEquals';
import phone from './phone';
import required from './required';

export type Validator = ((input: unknown) => true | string)

const validations = {
    alphanumeric,
    email,
    emailOrPhone,
    equals,
    letternumeric,
    max,
    min,
    notEquals,
    phone,
    required,
    afterDate,
    beforeDate,
};

export default validations;

export {
    afterDate,
    alphanumeric,
    beforeDate,
    email,
    emailOrPhone,
    equals,
    letternumeric,
    max,
    min,
    notEquals,
    phone,
    required,
};
