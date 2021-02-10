import alphanumeric from "./alphanumeric";

describe(`alphanumeric validation`, () => {
    const errorMessage = `Input is not alphanumeric`;

    test(`not alphanumeric`, () => {
        expect(alphanumeric()(`Hello!`)).not.toBe(true);
        expect(alphanumeric()(`#cool`)).not.toBe(true);
        expect(alphanumeric()(`S!@# !!!!`)).not.toBe(true);
        expect(alphanumeric()(`@calmid.com`)).not.toBe(true);
    });

    test(`not alphanumeric with custom error message`, () => {
        expect(alphanumeric(errorMessage)(`Nooice!!11`)).toBe(errorMessage);
        expect(alphanumeric(errorMessage)(`^_^`)).toBe(errorMessage);
        expect(alphanumeric(errorMessage)(`h@t`)).toBe(errorMessage);
    });

    test(`alphanumeric`, () => {
        expect(alphanumeric()(`k3wl`)).toBe(true);
        expect(alphanumeric()(`Super nice input`)).toBe(true);
    });

    test(`alphanumeric with custom error message`, () => {
        expect(alphanumeric(errorMessage)(`n1c3`)).toBe(true);
        expect(alphanumeric(errorMessage)(`toodles`)).toBe(true);
    });
});
