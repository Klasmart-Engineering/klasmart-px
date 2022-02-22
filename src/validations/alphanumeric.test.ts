import alphanumeric from "./alphanumeric";

describe(`alphanumeric validation`, () => {
    const errorMessage = `Input is not alphanumeric`;

    test(`not alphanumeric`, () => {
        expect(alphanumeric()(`Hello!`)).not.toBe(true);
        expect(alphanumeric()(`#cool`)).not.toBe(true);
        expect(alphanumeric()(`S!@# !!!!`)).not.toBe(true);
        expect(alphanumeric()(`@calmid.com`)).not.toBe(true);
        expect(alphanumeric()(`text_with_symbol`)).not.toBe(true);
    });

    test(`not alphanumeric with custom error message`, () => {
        expect(alphanumeric(errorMessage)(`Nooice!!11`)).toBe(errorMessage);
        expect(alphanumeric(errorMessage)(`^_^`)).toBe(errorMessage);
        expect(alphanumeric(errorMessage)(`h@t`)).toBe(errorMessage);
    });

    test(`alphanumeric`, () => {
        expect(alphanumeric()(`k3wl`)).toBe(true);
        expect(alphanumeric()(`ABCDEFG123`)).toBe(true);
        expect(alphanumeric()(`hellothere`)).toBe(true);
    });

    test(`alphanumeric with custom error message`, () => {
        expect(alphanumeric(errorMessage)(`n1c3`)).toBe(true);
        expect(alphanumeric(errorMessage)(`toodles`)).toBe(true);
        expect(alphanumeric(errorMessage)(`OKIDOKI`)).toBe(true);
    });

    test(`empty`, () => {
        expect(alphanumeric()(``)).toBe(true);
        expect(alphanumeric()(undefined)).toBe(true);
        expect(alphanumeric()(null)).toBe(true);
    });
});
