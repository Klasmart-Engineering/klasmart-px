import beforeDate from "./beforeDate";

describe(`Before date validation`, () => {
    const errorMessage = `Choose a valid date!`;

    test(`Returns true with valid dates.`, () => {
        const date = new Date(`2000-06`);
        expect(beforeDate(new Date(), errorMessage)(date) as boolean).toBe(true);
        expect(beforeDate(new Date(), errorMessage)(``) as boolean).toBe(true);
    });

    test(`Returns error message with non valid dates.`, () => {
        const future = new Date(`2030-08`);
        expect(beforeDate(new Date(), errorMessage)(future) as boolean).toBe(errorMessage);
    });
});
