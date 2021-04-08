import emailTests from "./email.test";
import emailOrPhone from "./emailOrPhone";
import phoneTests from "./phone.test";

describe(`email or phone validation`, () => {
    emailTests(emailOrPhone);
    phoneTests(emailOrPhone);
});
