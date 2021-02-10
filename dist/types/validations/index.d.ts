import alphanumeric from './alphanumeric';
import email from './email';
import equals from './equals';
import max from './max';
import min from './min';
import phone from './phone';
import required from './required';
declare const validations: {
    alphanumeric: (errorMessage?: string | undefined) => (input: any) => string | true;
    email: (errorMessage?: string | undefined) => (input: any) => string | true;
    equals: (value: any, errorMessage?: string | undefined) => (input: any) => string | true;
    max: (max: number, errorMessage?: string | undefined) => (input: any) => string | true;
    min: (min: number, errorMessage?: string | undefined) => (input: any) => string | true;
    phone: (errorMessage?: string | undefined) => (input: any) => string | true;
    required: (errorMessage?: string | undefined) => (input: any) => string | true;
};
export default validations;
export { alphanumeric, email, equals, max, min, phone, required, };
