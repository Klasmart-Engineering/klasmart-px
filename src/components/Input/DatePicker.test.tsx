import { render } from '../../../test/themeProviderRender';
import LocalizationProvider from '../LocalizationProvider';
import DatePicker from "./DatePicker";
import {
    screen,
    waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

beforeEach(() => {
    jest.clearAllMocks();

    Object.defineProperty(window, `matchMedia`, {
        writable: true,
        value: (query: string): MediaQueryList => ({
            media: query,
            matches: query === `(pointer: fine)`,
            onchange: () => jest.fn,
            addEventListener: () => jest.fn,
            removeEventListener: () => jest.fn,
            addListener: () => jest.fn,
            removeListener: () => jest.fn,
            dispatchEvent: () => false,
        }),
    });
});
const defaultDate = `02/10/2022`;
const defaultProps = {
    label: `DatePicker Label`,
    loading: false,
    value: new Date(defaultDate),
    placeholder: `DD/MM/YYYY`,
};

const VALIDATION_FAILED_MESSAGE = `Validation Failed`;
const failingValidation = jest.fn((input: unknown): string => VALIDATION_FAILED_MESSAGE);

describe(`DatePicker`, () => {
    describe(`Render`, () => {
        test(`default props`, () => {
            render((
                <LocalizationProvider locale={`en`}>
                    <DatePicker
                        {...defaultProps}
                    />
                </LocalizationProvider>
            ));
            expect(screen.getByLabelText(defaultProps.label)).toBeInTheDocument();
            expect(screen.getByLabelText(defaultProps.label, {
                selector: `input`,
            })).toHaveValue(defaultDate);
        });

        test(`default props with null value`, () => {
            const props = {
                ...defaultProps,
                value: null,
            };

            render((
                <LocalizationProvider locale={`en`}>
                    <DatePicker
                        {...props}
                    />
                </LocalizationProvider>
            ));

            expect(screen.getByLabelText(defaultProps.label)).toBeInTheDocument();
            expect(screen.getByLabelText(defaultProps.label, {
                selector: `input`,
            })).toHaveValue(``);
        });
    });

    describe(`Interact`, () => {
        test(`Datepicker opens with full calendar view`, async () => {
            render((
                <LocalizationProvider locale={`en`}>
                    <DatePicker
                        {...defaultProps}
                        views={[ `day` ]}
                    />
                </LocalizationProvider>
            ));

            const button = await screen.findByTestId(`CalendarIcon`);
            userEvent.click(button);
            expect(screen.getByText(`February`)).toBeInTheDocument();
            expect(screen.getByRole(`button`, {
                name: `Feb 15, 2022`,
            })).toBeInTheDocument();
        });

        test(`Datepicker opens with year view`, async () => {
            render((
                <LocalizationProvider locale={`en`}>
                    <DatePicker
                        {...defaultProps}
                        views={[ `year` ]}
                        minDate={new Date(`01/01/1930`)}
                        maxDate={new Date(`12/31/2050`)}
                    />
                </LocalizationProvider>
            ));

            const button = await screen.findByTestId(`CalendarIcon`);
            userEvent.click(button);

            await waitFor(() => {
                expect(screen.getByRole(`button`, {
                    name: `2022`,
                })).toBeInTheDocument();
            });

            expect(screen.getByRole(`button`, {
                name: `1930`,
            })).toBeInTheDocument();

            expect(screen.getByRole(`button`, {
                name: `2050`,
            })).toBeInTheDocument();

            expect(screen.queryByRole(`button`, {
                name: `1929`,
            })).not.toBeInTheDocument();

            expect(screen.queryByRole(`button`, {
                name: `2051`,
            })).not.toBeInTheDocument();
        });

        test(`Datepicker opens with month view`, async () => {
            render((
                <LocalizationProvider locale={`en`}>
                    <DatePicker
                        {...defaultProps}
                        views={[ `month` ]}
                    />
                </LocalizationProvider>
            ));

            const button = await screen.findByTestId(`CalendarIcon`);
            userEvent.click(button);

            await waitFor(() => {
                expect(screen.getByRole(`button`, {
                    name: `Jan`,
                })).toBeInTheDocument();
            });

            expect(screen.getByRole(`button`, {
                name: `Dec`,
            })).toBeInTheDocument();
        });

        test(`Datepicker cycles through views correctly`, async () => {
            render((
                <LocalizationProvider locale={`en`}>
                    <DatePicker
                        {...defaultProps}
                        views={[ `year`, `month` ]}
                    />
                </LocalizationProvider>
            ));

            const button = await screen.findByTestId(`CalendarIcon`);
            userEvent.click(button);

            await waitFor(() => {
                expect(screen.getByRole(`button`, {
                    name: `2022`,
                })).toBeInTheDocument();
            });

            userEvent.click(screen.getByRole(`button`, {
                name: `2022`,
            }));

            await waitFor(() => {
                expect(screen.getByRole(`button`, {
                    name: `Jan`,
                })).toBeInTheDocument();
            });
        });

        test(`Datepicker shows validation message`, () => {
            render((
                <LocalizationProvider locale={`en`}>
                    <DatePicker
                        {...defaultProps}
                        validations={[ failingValidation ]}
                    />
                </LocalizationProvider>
            ));

            expect(screen.getByText(VALIDATION_FAILED_MESSAGE)).toBeInTheDocument();
        });
    });
});
