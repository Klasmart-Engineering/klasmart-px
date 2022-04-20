import { render } from '../../../../test/themeProviderRender';
import TruncateChipTooltip from './TruncateChipTooltip';
import { screen } from "@testing-library/react";
import React,
{ cloneElement } from 'react';

describe(`TruncateChipTooltip`, () => {

    const truncateChipTooltip = (
        <TruncateChipTooltip
            items={[
                `item 1`,
                `item 2`,
                `item 3`,
                `item 4`,
                `item 5`,
            ]}
            label={(count) => `${count} kittens`}
            maxItemsInTooltip={3}
        />
    );

    test(`shows right correct chip label with number of items and pluralLabel`, () => {
        const expectedLabel = `5 kittens`;
        render(truncateChipTooltip);
        expect(screen.getByText(expectedLabel)).toBeInTheDocument();
    });

    test(`when only 1 item is present, simply shows that one`, () => {
        const expectedLabel = `item 1`;
        render(cloneElement(truncateChipTooltip, {
            items: [ `item 1` ],
        }));
        expect(screen.getByText(expectedLabel)).toBeInTheDocument();
    });
});
