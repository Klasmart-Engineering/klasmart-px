import getContrastColor from './getContrastColor';

describe(`getContrastColor`, () => {
    test(`receive no color`, () => {
        expect(getContrastColor).toThrow(`Cannot read property 'type' of undefined`);
    });

    test(`receive a non hex value`, () => {
        expect(() => {
            getContrastColor(`fff`);
        }).toThrow(`Material-UI: Unsupported \`fff\` color.\nWe support the following formats: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla().`);
    });

    describe(`default options`, () => {
        test(`receive light color`, () => {
            expect(getContrastColor(`#000`)).toBe(`#fff`);
        });

        test(`receive dark color`, () => {
            expect(getContrastColor(`#fff`)).toBe(`#000`);
        });
    });

    describe(`custom options`, () => {
        const options = {
            contrastThreshold: 3,
            darkColor: `#121F1F`,
            lightColor: `#CFD2D2`,
        };

        test(`receive custom light color`, () => {
            expect(getContrastColor(`#000`, options)).toBe(`#CFD2D2`);
        });

        test(`receive custom dark color`, () => {
            expect(getContrastColor(`#fff`, options)).toBe(`#121F1F`);
        });
    });
});
