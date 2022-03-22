import { render } from '../../../test/themeProviderRender';
import Select from "./Select";
import {
    screen,
    waitFor,
} from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import React from "react";

const defaultProps = {
    fullWidth: true,
    label: `testLabel`,
    value: ``,
    disabled: false,
    loading: false,
    placeholder: `Placeholder`,
    items: [
        `This`,
        `Is`,
        `A`,
        `Value`,
    ],
};

beforeEach(() => {
    jest.clearAllMocks();
});

const VALIDATION_FAILED_MESSAGE = `Validation Failed`;
const passingValidation = jest.fn((input: unknown): true => true);
const failingValidation = jest.fn((input: unknown): string => VALIDATION_FAILED_MESSAGE);

const openMenu = () => {
    userEvent.click(screen.getByRole(`button`));
};

const closeMenu = () => {
    //workaround to close menu when multiple enabled.  MUI's presentation layer prevents close on click
    userEvent.type(screen.getByRole(`listbox`), `{esc}`);
};

describe(`Select Component Test`, () => {
    describe(`Render`, () => {
        test(`default props`, () => {
            render(<Select {...defaultProps} />);

            const select = screen.getByRole(`button`);
            expect(select).toBeInTheDocument();
        });

        test(`Options Menu Renders`, () => {
            render(<Select {...defaultProps} />);
            expect(screen.queryByRole(`listbox`)).not.toBeInTheDocument();

            openMenu();
            expect(screen.getByRole(`listbox`)).toBeInTheDocument();
            const options = screen.queryAllByRole(`option`);
            expect(options).toHaveLength(defaultProps.items.length);
            expect(options[0]).toHaveTextContent(`${defaultProps.items[0]}`);
        });

        test(`Loading Indicator`, () => {
            render((
                <Select
                    {...defaultProps}
                    loading
                />
            ));

            expect(screen.getByRole(`progressbar`)).toBeInTheDocument();
        });

        test(`Multiple Enabled`, () => {
            render((
                <Select
                    {...defaultProps}
                    multiple
                />
            ));

            openMenu();
            const options = screen.getAllByRole(`option`);
            const checkBoxes = screen.getAllByRole(`checkbox`);

            expect(options).toHaveLength(defaultProps.items.length + 2); //options includes Select All + <hr /> divider
            expect(options[0]).toHaveTextContent(`Select All`);

            expect(checkBoxes).toHaveLength(defaultProps.items.length + 1); //+1 for the Select All Checkbox
        });

        test(`check error on failing validation`, () => {
            const props = {
                ...defaultProps,
                validations: [ failingValidation ],
            };
            render(<Select {...props} />);

            expect(screen.getByText(VALIDATION_FAILED_MESSAGE)).toBeInTheDocument();
        });

        test(`check no error on passing validation`, () => {
            const props = {
                ...defaultProps,
                validations: [ passingValidation ],
            };
            render(<Select {...props} />);

            expect(screen.queryByText(VALIDATION_FAILED_MESSAGE)).not.toBeInTheDocument();
        });
    });

    describe(`Interact`, () => {
        test(`Single Select - Click list item`, () => {
            render((
                <Select
                    {...defaultProps}
                />
            ));
            expect(screen.queryByRole(`listbox`)).not.toBeInTheDocument();

            openMenu();
            const options = screen.getAllByRole(`option`);
            userEvent.click(options[0]);

            const select = screen.getByRole(`button`);

            expect(screen.queryByRole(`listbox`)).not.toBeInTheDocument();
            expect(select).toHaveTextContent(`This`);

            openMenu();
            userEvent.click(options[3]);

            expect(select).toHaveTextContent(`Value`);
        });

        test(`Multiple Select`, async () => {
            render((
                <Select
                    {...defaultProps}
                    multiple
                />
            ));

            const select = screen.getByRole(`button`);

            expect(screen.queryByRole(`listbox`)).not.toBeInTheDocument();
            expect(select).toBeInTheDocument();

            openMenu();
            expect(screen.getByRole(`listbox`)).toBeInTheDocument();
            const options = screen.getAllByRole(`option`);
            const checkBoxes = screen.getAllByRole(`checkbox`);
            expect(options).toHaveLength(defaultProps.items.length + 2);
            expect(options[0]).toHaveTextContent(`Select All`);
            expect(checkBoxes).toHaveLength(defaultProps.items.length + 1);

            userEvent.click(checkBoxes[1]);
            userEvent.click(checkBoxes[2]);

            closeMenu();
            const chips = screen.getAllByTestId(`chip`);
            expect(screen.queryByRole(`listbox`)).not.toBeInTheDocument();
            expect(chips).toHaveLength(2);
            expect(chips[0]).toHaveTextContent(defaultProps.items[0]);
            expect(chips[1]).toHaveTextContent(defaultProps.items[1]);

            userEvent.click(screen.getAllByTestId(`CancelIcon`)[0]);
            await waitFor(() => {
                expect(screen.queryByText(defaultProps.items[0])).not.toBeInTheDocument();
            });
            expect(screen.getAllByRole(`button`)).toHaveLength(2);
        });
        test(`Select All`, () => {
            render((
                <Select
                    {...defaultProps}
                    multiple
                />
            ));

            openMenu();
            const options = screen.getAllByRole(`option`);
            expect(options[0]).toHaveTextContent(`Select All`);
            userEvent.click(options[0]);
            closeMenu();

            const buttons = screen.getAllByRole(`button`);
            expect(buttons).toHaveLength(defaultProps.items.length + 1);
        });
    });
});
