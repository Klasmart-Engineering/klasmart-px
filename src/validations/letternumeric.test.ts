import letternumeric from "./letternumeric";

describe(`letternumeric validation`, () => {
    const errorMessage = `Input is not letternumeric`;

    test(`not letternumeric`, () => {
        expect(letternumeric()(`Hello!`)).not.toBe(true);
        expect(letternumeric()(`#cool`)).not.toBe(true);
        expect(letternumeric()(`S!@# !!!!`)).not.toBe(true);
        expect(letternumeric()(`@calmid.com`)).not.toBe(true);
    });

    test(`not letternumeric with custom error message`, () => {
        expect(letternumeric(errorMessage)(`Nooice!!11`)).toBe(errorMessage);
        expect(letternumeric(errorMessage)(`^_^`)).toBe(errorMessage);
        expect(letternumeric(errorMessage)(`h@t`)).toBe(errorMessage);
    });

    test(`letternumeric`, () => {
        expect(letternumeric()(`k3wl`)).toBe(true);
        expect(letternumeric()(`Super nice input`)).toBe(true);
        expect(letternumeric()(`안녕하세요`)).toBe(true);
        expect(letternumeric()(`你好`)).toBe(true);
        expect(letternumeric()(`hello there`)).toBe(true);
        expect(letternumeric()(`Max length '35' of characters and this is even longer.`)).toBe(true);
    });

    test(`letternumeric with custom error message`, () => {
        expect(letternumeric(errorMessage)(`n1c3`)).toBe(true);
        expect(letternumeric(errorMessage)(`toodles`)).toBe(true);
        expect(letternumeric(errorMessage)(`Chào chị`)).toBe(true);
        expect(letternumeric(errorMessage)(`Hallå`)).toBe(true);
        expect(letternumeric(errorMessage)(`hej hej hej`)).toBe(true);
    });

    test(`empty`, () => {
        expect(letternumeric()(``)).toBe(true);
        expect(letternumeric()(undefined)).toBe(true);
        expect(letternumeric()(null)).toBe(true);
    });

    test(`exceptions`, () => {
        expect(letternumeric()(`Speech & Language Skills`)).toBe(true);
        expect(letternumeric()(`Language/Literacy`)).toBe(true);
    });
});
