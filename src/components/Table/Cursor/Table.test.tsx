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
} from "@testing-library/react";
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
    window.ResizeObserver = jest.fn().mockImplementation(() => ({
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
            const component = <CursorTable {...defaultProps} />;

            render(component);

            await waitFor(() => {
                expect(screen.getByText(`John`)).toBeInTheDocument();
            });
        });
        test(`combobox render`, () => {
            const component = (
                <CursorTable
                    {
                        ...defaultProps
                    }
                    filters={comboBoxFilters}
                />
            );

            render(component);

            userEvent.click(screen.getByText(`Add Filter`));

            expect(screen.getByRole(`combobox`)).toBeInTheDocument();
        });
    });

    describe(`Interact`, () => {
        test(`add filter with Select Menu`, async () => {
            const component = <CursorTable {...defaultProps} />;

            render(component);

            userEvent.click(screen.getByText(`Add Filter`));

            const columnSelectInput = screen.getByTestId(`ColumnSelectTextInput`) as HTMLInputElement;

            userEvent.click(screen.getAllByRole(`button`)[0]);

            expect(screen.getByRole(`listbox`)).not.toBeNull();

            const columnOptions = screen.getAllByRole(`option`);
            userEvent.click(columnOptions[1]); //should select status

            await waitFor(() => {
                expect(columnSelectInput.value).toEqual(`status`);
            });
            await waitFor(() => {
                expect(screen.getAllByText(`Status`, {
                    selector: `span`,
                })).toHaveLength(1);
            });

            const valueSelectInput = screen.getByTestId(`ValueSelectTextInput`) as HTMLInputElement;
            expect(valueSelectInput.value).toEqual(``);

            userEvent.click(screen.getAllByRole(`button`)[2]);

            await waitFor(() => {
                expect(screen.getByRole(`listbox`)).not.toBeNull();
            });
            await waitFor(() => {
                expect(screen.queryAllByText(`Active`, {
                    selector: `span`,
                })).toHaveLength(1);
            });

            const valueOptions = screen.getAllByRole(`option`);
            userEvent.click(valueOptions[0]);

            await waitFor(() => {
                expect(valueSelectInput.value).toEqual(`active`);
            });
            await waitFor(() => {
                expect(screen.queryAllByText(`Active`, {
                    selector: `span`,
                })).toHaveLength(1);
            });

            userEvent.click(screen.getAllByText(`Add Filter`)[1]);

            await waitFor(() => {
                expect(screen.getByTestId(`statusChipLabel`)).toHaveTextContent(`Status equals "Active"`);
            });
        });

        test(`Add Filter with Combobox Menu`, async () => {
            const component = (
                <CursorTable
                    {
                        ...defaultProps
                    }
                    filters={comboBoxFilters}
                />
            );
            render(component);

            userEvent.click(screen.getByText(`Add Filter`));

            expect(await screen.findByRole(`combobox`)).toBeInTheDocument();

            const comboBoxInput = screen.getByRole(`combobox`, {
                name: `Values`,
            });
            userEvent.click(comboBoxInput);

            const options = screen.getAllByRole(`option`);

            await waitFor(() => {
                expect(options).toHaveLength(3);
            });

            userEvent.click(options[2]);

            const comboBoxChip = screen.getByRole(`button`, {
                name: `${options[2].textContent}`,
            });

            await waitFor(() => {
                expect(comboBoxChip).toHaveTextContent(`${options[2].textContent}`);
            });

            userEvent.click(screen.getAllByText(`Add Filter`)[1]);

            expect(await screen.findByRole(`button`, {
                name: `Organization Roles equals "Test Parent"`,
            })).toBeInTheDocument();
        });

        test(`edit filter`, async () => {
            const component = <CursorTable {...defaultProps} />;

            render(component);

            userEvent.click(screen.getByText(`Add Filter`));

            const columnSelectInput = screen.getByTestId(`ColumnSelectTextInput`) as HTMLInputElement;

            userEvent.click(screen.getAllByRole(`button`)[0]);

            expect(screen.getByRole(`listbox`)).not.toBeNull();

            const columnOptions = screen.getAllByRole(`option`);
            userEvent.click(columnOptions[1]);

            await waitFor(() => {
                expect(columnSelectInput.value).toEqual(`status`);
            });
            await waitFor(() => {
                expect(screen.queryAllByText(`Status`, {
                    selector: `span`,
                })).toHaveLength(1);
            });

            let valueSelectInput = screen.getByTestId(`ValueSelectTextInput`) as HTMLInputElement;
            expect(valueSelectInput.value).toEqual(``);

            userEvent.click(screen.getAllByRole(`button`)[2]);

            await waitFor(() => {
                expect(screen.getByRole(`listbox`)).not.toBeNull();
            });
            await waitFor(() => {
                expect(screen.queryAllByText(`Active`, {
                    selector: `span`,
                })).toHaveLength(1);
            });

            let valueOptions = screen.getAllByRole(`option`);
            userEvent.click(valueOptions[0]);

            await waitFor(() => {
                expect(valueSelectInput.value).toEqual(`active`);
            });
            await waitFor(() => {
                expect(screen.queryAllByText(`Active`, {
                    selector: `span`,
                })).toHaveLength(1);
            });

            userEvent.click(screen.getAllByText(`Add Filter`)[1]);

            await waitFor(() => {
                expect(screen.getByTestId(`statusChipLabel`)).toHaveTextContent(`Status equals "Active"`);
            });

            userEvent.click(screen.getByTestId(`statusChipLabel`));

            expect(valueSelectInput.value).toEqual(`active`);

            userEvent.click(screen.getAllByRole(`button`)[2]);

            await waitFor(() => {
                expect(screen.getByRole(`listbox`)).not.toBeNull();
            });
            await waitFor(() => {
                expect(screen.queryAllByText(`Active`, {
                    selector: `span`,
                })).toHaveLength(2);
            });

            valueOptions = screen.getAllByRole(`option`);
            userEvent.click(valueOptions[1]);

            valueSelectInput = screen.getByTestId(`ValueSelectTextInput`) as HTMLInputElement;

            await waitFor(() => {
                expect(valueSelectInput.value).toEqual(`inactive`);
            });
            await waitFor(() => {
                expect(screen.queryAllByText(`Inactive`, {
                    selector: `span`,
                })).toHaveLength(1);
            });

            userEvent.click(screen.getAllByText(`Save Filter`)[0]);

            await waitFor(() => {
                expect(screen.getByTestId(`statusChipLabel`)).toHaveTextContent(`Status equals "Inactive"`);
            });
        });

        test(`remove filter`, async () => {
            const component = <CursorTable {...defaultProps} />;

            render(component);

            userEvent.click(screen.getByText(`Add Filter`));

            const columnSelectInput = screen.getByTestId(`ColumnSelectTextInput`) as HTMLInputElement;

            userEvent.click(screen.getAllByRole(`button`)[0]);

            expect(screen.getByRole(`listbox`)).not.toBeNull();

            const columnOptions = screen.getAllByRole(`option`);
            userEvent.click(columnOptions[1]);

            await waitFor(() => {
                expect(columnSelectInput.value).toEqual(`status`);
            });
            await waitFor(() => {
                expect(screen.queryAllByText(`Status`, {
                    selector: `span`,
                })).toHaveLength(1);
            });

            const valueSelectInput = screen.getByTestId(`ValueSelectTextInput`) as HTMLInputElement;
            expect(valueSelectInput.value).toEqual(``);

            userEvent.click(screen.getAllByRole(`button`)[2]);

            await waitFor(() => {
                expect(screen.getByRole(`listbox`)).not.toBeNull();
            });
            await waitFor(() => {
                expect(screen.queryAllByText(`Active`, {
                    selector: `span`,
                })).toHaveLength(1);
            });

            const valueOptions = screen.getAllByRole(`option`);
            userEvent.click(valueOptions[0]);

            await waitFor(() => {
                expect(valueSelectInput.value).toEqual(`active`);
            });
            await waitFor(() => {
                expect(screen.queryAllByText(`Active`, {
                    selector: `span`,
                })).toHaveLength(1);
            });

            userEvent.click(screen.getAllByText(`Add Filter`)[1]);

            await waitFor(() => {
                expect(screen.getByTestId(`statusChipLabel`)).toHaveTextContent(`Status equals "Active"`);
            });

            const deleteIcon = document.querySelector(`.MuiChip-deleteIcon`) as HTMLElement;

            userEvent.click(deleteIcon);

            await waitFor(() => {
                expect(screen.queryAllByText(`Status`, {
                    selector: `span`,
                })).toHaveLength(0);
            });
            await waitFor(() => {
                expect(screen.queryAllByText(`equals`, {
                    selector: `span`,
                })).toHaveLength(0);
            });
            await waitFor(() => {
                expect(screen.queryAllByText(`"Active"`, {
                    selector: `span`,
                })).toHaveLength(0);
            });
        });

        test(`clear all filters`, async () => {
            const component = <CursorTable {...defaultProps} />;

            render(component);

            userEvent.click(screen.getByText(`Add Filter`));

            const columnSelectInput = screen.getByTestId(`ColumnSelectTextInput`) as HTMLInputElement;

            userEvent.click(screen.getAllByRole(`button`)[0]);

            expect(screen.getByRole(`listbox`)).not.toBeNull();

            const columnOptions = screen.getAllByRole(`option`);
            userEvent.click(columnOptions[1]);

            await waitFor(() => {
                expect(columnSelectInput.value).toEqual(`status`);
            });
            await waitFor(() => {
                expect(screen.queryAllByText(`Status`, {
                    selector: `span`,
                })).toHaveLength(1);
            });

            const valueSelectInput = screen.getByTestId(`ValueSelectTextInput`) as HTMLInputElement;
            expect(valueSelectInput.value).toEqual(``);

            userEvent.click(screen.getAllByRole(`button`)[2]);

            await waitFor(() => {
                expect(screen.getByRole(`listbox`)).not.toBeNull();
            });
            await waitFor(() => {
                expect(screen.queryAllByText(`Active`, {
                    selector: `span`,
                })).toHaveLength(1);
            });

            const valueOptions = screen.getAllByRole(`option`);
            userEvent.click(valueOptions[0]);

            await waitFor(() => {
                expect(valueSelectInput.value).toEqual(`active`);
            });
            await waitFor(() => {
                expect(screen.queryAllByText(`Active`, {
                    selector: `span`,
                })).toHaveLength(1);
            });

            userEvent.click(screen.getAllByText(`Add Filter`)[1]);

            await waitFor(() => {
                expect(screen.getByTestId(`statusChipLabel`)).toHaveTextContent(`Status equals "Active"`);
            });

            userEvent.click(screen.getByTestId(`clearFilters`));

            await waitFor(() => {
                expect(screen.queryAllByText(`Status`, {
                    selector: `span`,
                })).toHaveLength(0);
            });
            await waitFor(() => {
                expect(screen.queryAllByText(`equals`, {
                    selector: `span`,
                })).toHaveLength(0);
            });
            await waitFor(() => {
                expect(screen.queryAllByText(`"Active"`, {
                    selector: `span`,
                })).toHaveLength(0);
            });
        });

        test(`input search text`, async () => {
            const component = <CursorTable {...defaultProps} />;

            render(component);

            const searchInput = screen.getByPlaceholderText(`Search`) as HTMLInputElement;

            fireEvent.change(searchInput, {
                target: {
                    value: `Mike Portnoy`,
                },
            });

            await waitFor(() => {
                expect(searchInput.value).toEqual(`Mike Portnoy`);
            });
        });

        test(`clear search text`, async () => {
            const component = <CursorTable {...defaultProps} />;

            render(component);

            const searchInput = screen.getByPlaceholderText(`Search`) as HTMLInputElement;

            fireEvent.change(searchInput, {
                target: {
                    value: ``,
                },
            });

            await waitFor(() => {
                expect(searchInput.value).toEqual(``);
            });
        });

        test(`sort asc to desc`, async () => {
            const component = <CursorTable {...defaultProps} />;

            render(component);

            let userRowsInTable = screen.getAllByTestId(`tableRow`, {
                exact: false,
            });

            expect(userRowsInTable).toHaveLength(4);
            expect(userRowsInTable[0]).toHaveTextContent(`Andres`);
            expect(userRowsInTable[1]).toHaveTextContent(`John`);

            userEvent.click(screen.getByTestId(`givenNameSortHandler`));

            await waitFor(() => {
                userRowsInTable = screen.getAllByTestId(`tableRow`, {
                    exact: false,
                });
                expect(userRowsInTable).toHaveLength(4);
            });
            await waitFor(() => {
                expect(userRowsInTable[0]).toHaveTextContent(`Stephen`);
            });
            await waitFor(() => {
                expect(userRowsInTable[1]).toHaveTextContent(`Mike`);
            });
        });

        test(`sort desc to asc`, async () => {
            const mockedProps = {
                ...defaultProps,
                order: `desc`,
            };

            const component = <CursorTable {...mockedProps} />;

            render(component);

            let userRowsInTable = screen.getAllByTestId(`tableRow`, {
                exact: false,
            });

            expect(userRowsInTable).toHaveLength(4);
            expect(userRowsInTable[0]).toHaveTextContent(`Stephen`);
            expect(userRowsInTable[1]).toHaveTextContent(`Mike`);

            userEvent.click(screen.getByTestId(`givenNameSortHandler`));

            await waitFor(() => {
                userRowsInTable = screen.getAllByTestId(`tableRow`, {
                    exact: false,
                });
                expect(userRowsInTable).toHaveLength(4);
            });
            await waitFor(() => {
                expect(userRowsInTable[1]).toHaveTextContent(`John`);
            });
        });
    });
});
