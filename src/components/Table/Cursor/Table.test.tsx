/* eslint-disable testing-library/no-node-access */
import '@testing-library/jest-dom';
import {
    columns,
    comboBoxFilters,
    filters,
    UserRow,
    userRows,
} from '../../../../test/mockdata/mockTableData';
import { render } from '../../../../test/themeProviderRender';
import CursorTable from './Table';
import {
    fireEvent,
    screen,
    waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

const defaultProps = {
    order: `asc`,
    orderBy: `givenName`,
    hasNextPage: false,
    hasPreviousPage: false,
    startCursor: ``,
    endCursor: ``,
    columns: columns,
    filters: filters,
    rows: userRows,
    idField: `id` as keyof UserRow,
};

const { ResizeObserver } = window;

beforeEach(() => {
    //https://github.com/maslianok/react-resize-detector/issues/145
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    delete window.ResizeObserver;
    window.ResizeObserver = jest.fn()
        .mockImplementation(() => ({
            observe: jest.fn(),
            unobserve: jest.fn(),
            disconnect: jest.fn(),
        }));
});

afterEach(() => {
    window.ResizeObserver = ResizeObserver;
    jest.restoreAllMocks();
});

describe(`Cursor Table`, () => {
    describe(`Render`, () => {
        test(`default props`, async () => {
            render(<CursorTable {...defaultProps} />);

            await waitFor(() => {
                expect(screen.getByText(`John`))
                    .toBeInTheDocument();
            });
        });
        test(`combobox render`, () => {
            const props ={
                ...defaultProps,
                filters: comboBoxFilters,
            };

            render(<CursorTable {...props} />);

            userEvent.click(screen.getByText(`Add Filter`));

            expect(screen.getByRole(`combobox`))
                .toBeInTheDocument();
        });
    });

    describe(`Interact`, () => {
        test(`add filter with Select Menu`, async () => {
            render(<CursorTable {...defaultProps} />);

            userEvent.click(screen.getByText(`Add Filter`));

            const columnSelectInput = screen.getByTestId(`ColumnSelectTextInput`);

            userEvent.click(screen.getAllByRole(`button`)[1]);

            expect(screen.getByRole(`listbox`))
                .toBeInTheDocument();

            userEvent.click(screen.getByRole(`option`, {
                name: `Status`,
            }));

            await waitFor(() => {
                expect(columnSelectInput)
                    .toHaveValue(`status`);
            });

            const valueSelectInput = screen.getByTestId(`ValueSelectTextInput`);
            expect(valueSelectInput)
                .toHaveValue(``);

            userEvent.click(screen.getAllByRole(`button`)[3]);

            await waitFor(() => {
                expect(screen.getByRole(`listbox`))
                    .toBeInTheDocument();
            });
            await waitFor(() => {
                expect(screen.queryAllByText(`Active`, {
                    selector: `span`,
                }))
                    .toHaveLength(1);
            });

            const valueOptions = screen.getAllByRole(`option`);
            userEvent.click(valueOptions[0]);

            await waitFor(() => {
                expect(valueSelectInput)
                    .toHaveValue(`active`);
            });
            await waitFor(() => {
                expect(screen.queryAllByText(`Active`, {
                    selector: `span`,
                }))
                    .toHaveLength(1);
            });

            userEvent.click(screen.getAllByText(`Add Filter`)[1]);

            await waitFor(() => {
                expect(screen.getByTestId(`statusChipLabel`))
                    .toHaveTextContent(`Status equals Active`);
            });
        });

        test(`Add Filter with Combobox Menu`, async () => {
            const props = {
                ...defaultProps,
                filters: comboBoxFilters,
            };

            render(<CursorTable {...props} />);

            userEvent.click(screen.getByText(`Add Filter`));

            expect(await screen.findByRole(`combobox`))
                .toBeInTheDocument();

            const comboBoxInput = screen.getByRole(`combobox`, {
                name: `Values`,
            });
            userEvent.click(comboBoxInput);

            const options = screen.getAllByRole(`option`);

            await waitFor(() => {
                expect(options)
                    .toHaveLength(3);
            });

            userEvent.click(options[2]);

            const comboBoxChip = screen.getByRole(`button`, {
                name: `${options[2].textContent}`,
            });

            await waitFor(() => {
                expect(comboBoxChip)
                    .toHaveTextContent(`${options[2].textContent}`);
            });

            userEvent.click(screen.getAllByText(`Add Filter`)[1]);

            expect(await screen.findByRole(`button`, {
                name: `Organization Roles equals Test Parent`,
            }))
                .toBeInTheDocument();
        });

        test(`edit filter`, async () => {
            render(<CursorTable {...defaultProps} />);

            userEvent.click(screen.getByText(`Add Filter`));

            const columnSelectInput = screen.getByTestId(`ColumnSelectTextInput`);

            userEvent.click(screen.getAllByRole(`button`)[1]);

            expect(screen.getByRole(`listbox`))
                .toBeInTheDocument();

            const columnOption = screen.getByRole(`option`, {
                name: `Status`,
            });
            userEvent.click(columnOption);

            await waitFor(() => {
                expect(columnSelectInput)
                    .toHaveValue(`status`);
            });

            let valueSelectInput = screen.getByTestId(`ValueSelectTextInput`);
            expect(valueSelectInput)
                .toHaveValue(``);

            userEvent.click(screen.getAllByRole(`button`)[3]);

            await waitFor(() => {
                expect(screen.getByRole(`listbox`))
                    .toBeInTheDocument();
            });

            let valueOptions = screen.getAllByRole(`option`);
            userEvent.click(valueOptions[0]);

            await waitFor(() => {
                expect(valueSelectInput)
                    .toHaveValue(`active`);
            });
            await waitFor(() => {
                expect(screen.queryAllByText(`Active`, {
                    selector: `span`,
                }))
                    .toHaveLength(1);
            });

            userEvent.click(screen.getAllByText(`Add Filter`)[1]);

            await waitFor(() => {
                expect(screen.getByTestId(`statusChipLabel`))
                    .toHaveTextContent(`Status equals Active`);
            });

            userEvent.click(screen.getByTestId(`statusChipLabel`));

            expect(valueSelectInput)
                .toHaveValue(`active`);

            userEvent.click(screen.getAllByRole(`button`)[3]);

            await waitFor(() => {
                expect(screen.getByRole(`listbox`))
                    .toBeInTheDocument();
            });

            valueOptions = screen.getAllByRole(`option`);
            userEvent.click(valueOptions[1]);

            valueSelectInput = screen.getByTestId(`ValueSelectTextInput`);

            await waitFor(() => {
                expect(valueSelectInput)
                    .toHaveValue(`inactive`);
            });

            userEvent.click(screen.getAllByText(`Save Filter`)[0]);

            expect(screen.getByTestId(`statusChipLabel`))
                .toHaveTextContent(`Status equals Inactive`);
        });

        test(`remove filter`, async () => {
            render(<CursorTable {...defaultProps} />);

            userEvent.click(screen.getByText(`Add Filter`));

            const columnSelectInput = screen.getByTestId(`ColumnSelectTextInput`);

            userEvent.click(screen.getAllByRole(`button`)[1]);

            expect(screen.getByRole(`listbox`))
                .toBeInTheDocument();

            const columnOptions = screen.getAllByRole(`option`);
            userEvent.click(columnOptions[1]);

            await waitFor(() => {
                expect(columnSelectInput)
                    .toHaveValue(`status`);
            });

            const valueSelectInput = screen.getByTestId(`ValueSelectTextInput`);
            expect(valueSelectInput)
                .toHaveValue(``);

            userEvent.click(screen.getAllByRole(`button`)[3]);

            await waitFor(() => {
                expect(screen.getByRole(`listbox`))
                    .toBeInTheDocument();
            });

            const valueOptions = screen.getAllByRole(`option`);
            userEvent.click(valueOptions[0]);

            await waitFor(() => {
                expect(valueSelectInput)
                    .toHaveValue(`active`);
            });

            userEvent.click(screen.getAllByText(`Add Filter`)[1]);

            await waitFor(() => {
                expect(screen.getByTestId(`statusChipLabel`))
                    .toHaveTextContent(`Status equals Active`);
            });

            userEvent.click(screen.getByRole(`button`, {
                name: `Clear filters`,
            }));

            expect(screen.queryByTestId(`statusChipLabel`)).not.toBeInTheDocument();
        });

        test(`clear all filters`, async () => {
            render(<CursorTable {...defaultProps} />);

            userEvent.click(screen.getByText(`Add Filter`));

            userEvent.click(screen.getAllByRole(`button`)[1]);

            expect(screen.getByRole(`listbox`))
                .toBeInTheDocument();

            const columnOption = screen.getByRole(`option`, {
                name: `Status`,
            });

            userEvent.click(columnOption);

            expect(await screen.findByTestId(`ColumnSelectTextInput`))
                .toHaveValue(`status`);

            const valueSelectInput = screen.getByTestId(`ValueSelectTextInput`);

            expect(valueSelectInput)
                .toHaveValue(``);

            userEvent.click(screen.getAllByRole(`button`)[3]);

            expect(await screen.findByRole(`listbox`))
                .toBeInTheDocument();

            const valueOptions = screen.getAllByRole(`option`);
            userEvent.click(valueOptions[0]);

            expect(valueSelectInput)
                .toHaveValue(`active`);

            userEvent.click(screen.getAllByRole(`button`, {
                name: `Add Filter`,
                hidden: true,
            })[1]);

            expect(screen.getByTestId(`statusChipLabel`))
                .toHaveTextContent(`Status equals Active`);

            userEvent.click(screen.getByRole(`button`, {
                name: `Clear filters`,
            }));

            expect(screen.queryByTestId(`statusChipLabel`)).not.toBeInTheDocument();
        });

        test(`input search text`, async () => {
            render(<CursorTable {...defaultProps} />);

            const searchInput = screen.getByPlaceholderText(`Search`);

            fireEvent.change(searchInput, {
                target: {
                    value: `Mike Portnoy`,
                },
            });

            await waitFor(() => {
                expect(searchInput)
                    .toHaveValue(`Mike Portnoy`);
            });
        });

        test(`clear search text`, async () => {
            render(<CursorTable {...defaultProps} />);

            const searchInput = screen.getByPlaceholderText(`Search`);

            fireEvent.change(searchInput, {
                target: {
                    value: ``,
                },
            });

            await waitFor(() => {
                expect(searchInput)
                    .toHaveValue(``);
            });
        });

        test(`sort asc to desc`, async () => {
            render(<CursorTable {...defaultProps} />);

            let userRowsInTable = screen.getAllByTestId(`tableRow`, {
                exact: false,
            });

            expect(userRowsInTable)
                .toHaveLength(4);
            expect(userRowsInTable[0])
                .toHaveTextContent(`Andres`);
            expect(userRowsInTable[1])
                .toHaveTextContent(`John`);

            userEvent.click(screen.getByTestId(`givenNameSortHandler`));

            await waitFor(() => {
                userRowsInTable = screen.getAllByTestId(`tableRow`, {
                    exact: false,
                });
                expect(userRowsInTable)
                    .toHaveLength(4);
            });
            await waitFor(() => {
                expect(userRowsInTable[0])
                    .toHaveTextContent(`Stephen`);
            });
            await waitFor(() => {
                expect(userRowsInTable[1])
                    .toHaveTextContent(`Mike`);
            });
        });

        test(`sort desc to asc`, async () => {
            const mockedProps = {
                ...defaultProps,
                order: `desc`,
            };

            render(<CursorTable {...mockedProps} />);

            let userRowsInTable = screen.getAllByTestId(`tableRow`, {
                exact: false,
            });

            expect(userRowsInTable)
                .toHaveLength(4);
            expect(userRowsInTable[0])
                .toHaveTextContent(`Stephen`);
            expect(userRowsInTable[1])
                .toHaveTextContent(`Mike`);

            userEvent.click(screen.getByTestId(`givenNameSortHandler`));

            await waitFor(() => {
                userRowsInTable = screen.getAllByTestId(`tableRow`, {
                    exact: false,
                });
                expect(userRowsInTable)
                    .toHaveLength(4);
            });
            await waitFor(() => {
                expect(userRowsInTable[1])
                    .toHaveTextContent(`John`);
            });
        });
    });
});
