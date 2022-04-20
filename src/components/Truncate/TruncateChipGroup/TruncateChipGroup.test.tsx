import { render } from '../../../../test/themeProviderRender';
import TruncateChipGroup from './TruncateChipGroup';
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from 'react';

describe(`TruncateChipGroup`, () => {

    const truncateChipGroup = (
        <TruncateChipGroup
            items={[
                `item 1`,
                `item 2`,
                `item 3`,
                `item 4`,
                `item 5`,
            ]}
            maxPreview={3}
        />
    );

    test(`truncates items to maxPreview`, async () => {
        render(truncateChipGroup);
        const items = await screen.findAllByRole(`listitem`);
        expect(items).toHaveLength(3);
    });

    test(`When show more is clicked, shows all items`, async () => {
        render(truncateChipGroup);
        const button = screen.getByRole(`button`);
        userEvent.click(button);
        const items = await screen.findAllByRole(`listitem`);
        expect(items).toHaveLength(5);
    });
});
