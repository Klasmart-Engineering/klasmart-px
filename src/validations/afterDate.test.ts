import afterDate from "./afterDate";

describe(`After date validation`, () => {
    const errorMessage = `Choose a valid date!`;

    test(`Returns true with valid dates.`, () => {
        const min = new Date(`1999-02`);
        const date = new Date(`2000-06`);
        expect(afterDate(min, errorMessage)(date) as boolean).toBe(true);
        expect(afterDate(min, errorMessage)(``) as boolean).toBe(true);
    });

    test(`Returns error message with non valid dates.`, () => {
        const min = new Date(`1999-02`);
        const past = new Date(`1910-08`);
        expect(afterDate(min, errorMessage)(past) as boolean).toBe(errorMessage);
    });
});
