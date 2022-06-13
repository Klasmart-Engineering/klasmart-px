import nameToInitials from "./nameToInitials";

describe(`nameToInitials`, () => {
    test(`convert name to 0 initials`, () => {
        expect(nameToInitials(``))
            .toBe(``);
        expect(nameToInitials(``, 1))
            .toBe(``);
        expect(nameToInitials(`Sven`, 0))
            .toBe(``);
    });

    test(`convert name to 1 or more initials`, () => {
        expect(nameToInitials(`Sven`))
            .toBe(`S`);
        expect(nameToInitials(`sven99`))
            .toBe(`S99`);
        expect(nameToInitials(`Sven 99`))
            .toBe(`S99`);
        expect(nameToInitials(`Nisse Hubert`, 1))
            .toBe(`N`);
        expect(nameToInitials(`NISSE HUBERT`))
            .toBe(`NH`);
        expect(nameToInitials(`OK Nice`))
            .toBe(`OKN`);
        expect(nameToInitials(`OK Nice`, 2))
            .toBe(`OK`);
        expect(nameToInitials(`Sven Göran Eriksson`))
            .toBe(`SGE`);
        expect(nameToInitials(`SVEN GÖRAN ERIKSSON`))
            .toBe(`SGE`);
        expect(nameToInitials(`Super-man's Home Kitchen`))
            .toBe(`SHK`);
    });
});
