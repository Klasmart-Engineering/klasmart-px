import email from './email';
import equals from './equals';
import phone from './phone';
import required from './required';
declare const validations: {
    email: (errorMessage?: string | undefined) => (input: any) => string | true;
    equals: (value: any, errorMessage?: string | undefined) => (input: any) => string | true;
    phone: (errorMessage?: string | undefined) => (input: any) => string | true;
    required: (errorMessage?: string | undefined) => (input: any) => string | true;
};
export default validations;
export { email, equals, phone, required, };
