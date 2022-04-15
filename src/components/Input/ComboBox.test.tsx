import { render } from '../../../test/themeProviderRender';
import BADA_CHARACTERS from "../../assets/mockdata/BADA_CHARACTERS";
import ComboBox from "./ComboBox";
import {
    fireEvent,
    screen,
} from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import React from "react";

beforeEach(() => {
    jest.clearAllMocks();
});

const VALIDATION_FAILED_MESSAGE = `Validation Failed`;

const passingValidation = jest.fn((input: unknown): true => true);

const failingValidation = jest.fn((input: unknown): string => VALIDATION_FAILED_MESSAGE);

const defaultProps = {
    label: `testLabel`,
    loading: false,
    options: BADA_CHARACTERS,
    optionsLimit: 10,
};

const clickInput = () => {
    const searchInput = screen.getByRole(`combobox`, {
        name: `testLabel`,
    });

    userEvent.click(searchInput);
};

const typeInputValue = (value: string) => {
    const searchInput = screen.getByRole(`combobox`, {
        name: `testLabel`,
    });

    userEvent.type(searchInput, value);
};

describe(`ComboBox`, () => {
    describe(`Render`, () => {
        test(`default props`, () => {
            render(<ComboBox {...defaultProps} />);

            const inputElement = screen.getByRole(`combobox`, {
                name: `testLabel`,
            });

            expect(inputElement).toBeInTheDocument();
            expect(screen.queryByRole(`progressbar`, {
                name: `testLabel`,
            })).not.toBeInTheDocument();
            expect(screen.getByTestId(`helper-text-root`)).toBeInTheDocument();
        });

        test(`drop down icon renders`, () => {
            render(<ComboBox {...defaultProps} />);

            const popupIndicator = screen.getByRole(`button`, {
                name: `Open`,
            });

            expect(popupIndicator).toBeInTheDocument();
        });

        test(`suggestion list closed on initial render`, () => {
            render(<ComboBox {...defaultProps} />);

            expect(screen.queryByText(`Abby`)).not.toBeInTheDocument();
        });

        test(`check loading indicator`, () => {
            const loadingComponent = (
                <ComboBox
                    loading
                    options={BADA_CHARACTERS}
                />);
            render(loadingComponent);

            expect(screen.getByRole(`progressbar`)).toBeInTheDocument();
        });
    });

    describe(`Interact`, () => {

        test(`list opens if input selected`, () => {
            render(<ComboBox {...defaultProps} />);

            clickInput();

            expect(screen.getAllByRole(`option`)).toHaveLength(defaultProps.optionsLimit);
        });

        test(`optionsLimit prop limits options`, () => {
            const OPTIONS_LENGTH = 15;
            const limitOptionsComboBox = (
                <ComboBox
                    {...defaultProps}
                    optionsLimit={OPTIONS_LENGTH}
                />);
            render(limitOptionsComboBox);

            expect(screen.queryAllByRole(`option`)).toHaveLength(0);

            clickInput();

            expect(screen.getAllByRole(`option`)).toHaveLength(OPTIONS_LENGTH);
        });

        test(`checkbox when multiple set true`, () => {
            const props = {
                ...defaultProps,
                multiple: true,
            };

            render(<ComboBox {...props} />);

            clickInput();

            expect(screen.getAllByTestId(`checkbox-root`)).toHaveLength(defaultProps.optionsLimit);
        });

        test.each([
            [ 3, 1 ],
            [ 5, 5 ],
            [ 10, 15 ],
        ])(`list amount %d should not exceed limt %d`, (listAmount, limit ) => {
            const props = {
                ...defaultProps,
                options: BADA_CHARACTERS.slice(0, listAmount),
                optionsLimit: limit,
            };

            render(<ComboBox {...props} />);

            clickInput();

            const optionsMenu = screen.queryAllByRole(`option`);

            expect(optionsMenu.length).toBeLessThanOrEqual(props.optionsLimit);
        });

        test(`typing should filter options`, () => {
            const inputText = `text`;
            render(<ComboBox {...defaultProps} />);

            const textOptions = defaultProps.options.map((option) => option.label);

            for (let i = 0; i < inputText.length; i++) {
                typeInputValue(inputText[i]);
                const filteredOptions = textOptions.filter((option) => option.includes(inputText.substring(0, i + 1)));
                expect(screen.queryAllByRole(`option`)).toHaveLength(filteredOptions.length);
            }
        });

        test(`options menu closes on select`, () => {
            render(<ComboBox {...defaultProps} />);

            clickInput();

            const selectOptions = screen.queryAllByRole(`option`);
            const firstOptionText = selectOptions[0].textContent;

            userEvent.click(selectOptions[0]);

            expect(screen.getByRole(`combobox`, {
                name: `testLabel`,
            })).toHaveValue(firstOptionText);
            expect(selectOptions[0]).not.toBeInTheDocument();
        });

        test(`options menu closes when input field is clicked`, () => {
            render(<ComboBox {...defaultProps} />);

            clickInput();

            const optionsMenu = screen.queryAllByRole(`listbox`);

            expect(optionsMenu[0]).toBeInTheDocument();

            clickInput();
            expect(optionsMenu[0]).not.toBeInTheDocument();
        });

        test(`when multiple, options menu stays open on select`, () => {
            const props = {
                ...defaultProps,
                multiple: true,
            };
            render(<ComboBox {...props} />);

            clickInput();

            const selectOptions = screen.queryAllByRole(`option`);

            fireEvent.click(selectOptions[0]);

            const chip = screen.getByRole(`button`, {
                name: `${selectOptions[0].textContent}`,
            });

            expect(chip).toBeInTheDocument();
            expect(screen.getByRole(`listbox`)).toBeInTheDocument();
        });

        test(`menu closes when click outside of component occurs`, () => {
            render(<ComboBox {...defaultProps} />);

            clickInput();

            expect(screen.getByRole(`listbox`)).toBeInTheDocument();

            userEvent.click(document.body);
            expect(screen.queryByRole(`listbox`)).not.toBeInTheDocument();
        });

        //TODO: write test if using custom chips
        test.todo(`add and remove chips`);
    });

    describe(`Validations`, () => {
        test(`check error on failing validation`, () => {
            const props = {
                ...defaultProps,
                selectValidations: [ failingValidation ],
            };
            render(<ComboBox {...props} />);

            expect(screen.getByTestId(`helper-text-root`)).toHaveTextContent(VALIDATION_FAILED_MESSAGE);
        });

        test(`check no error on passing validation`, () => {
            const props = {
                ...defaultProps,
                selectValidations: [ passingValidation ],
            };
            render(<ComboBox {...props} />);

            expect(screen.getByTestId(`helper-text-root`)).not.toHaveClass(`Mui-error`);
        });

        test(`custom error message on failing validation`, () => {
            const ERROR_MESSAGE = `custom error message`;
            const props = {
                ...defaultProps,
                selectValidations: [ failingValidation ],
                error: ERROR_MESSAGE,
            };
            render(<ComboBox {...props} />);

            expect(screen.getByTestId(`helper-text-root`)).toHaveTextContent(ERROR_MESSAGE);
        });

        test(`requires at least one option to be selected validation`, () => {
            const props = {
                ...defaultProps,
                selectValidations: [ failingValidation ],
                selectValue: undefined,
            };
            render(<ComboBox {...props} />);

            expect(screen.getByTestId(`helper-text-root`)).toHaveTextContent(VALIDATION_FAILED_MESSAGE);
        });
    });
});
