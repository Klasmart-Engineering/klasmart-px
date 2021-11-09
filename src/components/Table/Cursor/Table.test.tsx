import '@testing-library/jest-dom';
import {
    columns,
    filters,
    UserRow,
    userRows,
} from '../../../../test/mockTableData';
import CursorTable from './Table';
import {
    fireEvent,
    render,
    screen,
    waitFor,
} from "@testing-library/react";
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

describe(`Cursor Table`, () => {
    describe(`Render`, () => {
        test(`default props`, async () => {
            const component = <CursorTable
                {...defaultProps}
            />;

            render(component);

            await waitFor(() => {
                expect(screen.queryByText(`John`)).toBeInTheDocument();
            });
        });
    });

    describe(`Interact`, () => {
        test(`add filter`, async() => {
            const component = <CursorTable
                {...defaultProps}
            />;

            render(component);

            fireEvent.click(screen.getByText(`Add Filter`));

            const columnSelectInput = screen.getByTestId(`ColumnSelectTextInput`) as HTMLInputElement;

            fireEvent.mouseDown(screen.getAllByRole(`button`)[0]);

            expect(screen.getByRole(`listbox`)).not.toEqual(null);

            const columnOptions = screen.getAllByRole(`option`);
            fireEvent.click(columnOptions[1]);

            await waitFor(() => {
                expect(columnSelectInput.value).toEqual(`status`);
                expect(screen.queryAllByText(`Status`, {
                    selector: `span`,
                })).toHaveLength(1);
            });

            const valueSelectInput = screen.getByTestId(`ValueSelectTextInput`) as HTMLInputElement;
            expect(valueSelectInput.value).toEqual(``);

            fireEvent.mouseDown(screen.getAllByRole(`button`)[2]);

            await waitFor(() => {
                expect(screen.getByRole(`listbox`)).not.toEqual(null);
                expect(screen.queryAllByText(`Active`, {
                    selector: `span`,
                })).toHaveLength(1);
            });

            const valueOptions = screen.getAllByRole(`option`);
            fireEvent.click(valueOptions[0]);

            await waitFor(() => {
                expect(valueSelectInput.value).toEqual(`active`);
                expect(screen.queryAllByText(`Active`, {
                    selector: `span`,
                })).toHaveLength(1);
            });

            fireEvent.click(screen.getAllByText(`Add Filter`)[1]);

            await waitFor(() => {
                expect(screen.getByTestId(`statusChipLabel`)).toHaveTextContent(`Status equals "Active"`);
            });
        });

        test(`edit filter`, async() => {
            const component = <CursorTable
                {...defaultProps}
            />;

            render(component);

            fireEvent.click(screen.getByText(`Add Filter`));

            const columnSelectInput = screen.getByTestId(`ColumnSelectTextInput`) as HTMLInputElement;

            fireEvent.mouseDown(screen.getAllByRole(`button`)[0]);

            expect(screen.getByRole(`listbox`)).not.toEqual(null);

            const columnOptions = screen.getAllByRole(`option`);
            fireEvent.click(columnOptions[1]);

            await waitFor(() => {
                expect(columnSelectInput.value).toEqual(`status`);
                expect(screen.queryAllByText(`Status`, {
                    selector: `span`,
                })).toHaveLength(1);
            });

            let valueSelectInput = screen.getByTestId(`ValueSelectTextInput`) as HTMLInputElement;
            expect(valueSelectInput.value).toEqual(``);

            fireEvent.mouseDown(screen.getAllByRole(`button`)[2]);

            await waitFor(() => {
                expect(screen.getByRole(`listbox`)).not.toEqual(null);
                expect(screen.queryAllByText(`Active`, {
                    selector: `span`,
                })).toHaveLength(1);
            });

            let valueOptions = screen.getAllByRole(`option`);
            fireEvent.click(valueOptions[0]);

            await waitFor(() => {
                expect(valueSelectInput.value).toEqual(`active`);
                expect(screen.queryAllByText(`Active`, {
                    selector: `span`,
                })).toHaveLength(1);
            });

            fireEvent.click(screen.getAllByText(`Add Filter`)[1]);

            await waitFor(() => {
                expect(screen.getByTestId(`statusChipLabel`)).toHaveTextContent(`Status equals "Active"`);
            });

            fireEvent.click(screen.getByTestId(`statusChipLabel`));

            valueSelectInput = screen.getByTestId(`ValueSelectTextInput`) as HTMLInputElement;
            expect(valueSelectInput.value).toEqual(`active`);

            fireEvent.mouseDown(screen.getAllByRole(`button`)[2]);

            await waitFor(() => {
                expect(screen.getByRole(`listbox`)).not.toEqual(null);
                expect(screen.queryAllByText(`Active`, {
                    selector: `span`,
                })).toHaveLength(2);
            });

            valueOptions = screen.getAllByRole(`option`);
            fireEvent.click(valueOptions[1]);

            await waitFor(() => {
                expect(valueSelectInput.value).toEqual(`inactive`);
                expect(screen.queryAllByText(`Inactive`, {
                    selector: `span`,
                })).toHaveLength(1);
            });

            fireEvent.click(screen.getAllByText(`Save Filter`)[0]);

            await waitFor(() => {
                expect(screen.getByTestId(`statusChipLabel`)).toHaveTextContent(`Status equals "Inactive"`);
            });
        });

        test(`remove filter`, async() => {
            const component = <CursorTable
                {...defaultProps}
            />;

            render(component);

            fireEvent.click(screen.getByText(`Add Filter`));

            const columnSelectInput = screen.getByTestId(`ColumnSelectTextInput`) as HTMLInputElement;

            fireEvent.mouseDown(screen.getAllByRole(`button`)[0]);

            expect(screen.getByRole(`listbox`)).not.toEqual(null);

            const columnOptions = screen.getAllByRole(`option`);
            fireEvent.click(columnOptions[1]);

            await waitFor(() => {
                expect(columnSelectInput.value).toEqual(`status`);
                expect(screen.queryAllByText(`Status`, {
                    selector: `span`,
                })).toHaveLength(1);
            });

            const valueSelectInput = screen.getByTestId(`ValueSelectTextInput`) as HTMLInputElement;
            expect(valueSelectInput.value).toEqual(``);

            fireEvent.mouseDown(screen.getAllByRole(`button`)[2]);

            await waitFor(() => {
                expect(screen.getByRole(`listbox`)).not.toEqual(null);
                expect(screen.queryAllByText(`Active`, {
                    selector: `span`,
                })).toHaveLength(1);
            });

            const valueOptions = screen.getAllByRole(`option`);
            fireEvent.click(valueOptions[0]);

            await waitFor(() => {
                expect(valueSelectInput.value).toEqual(`active`);
                expect(screen.queryAllByText(`Active`, {
                    selector: `span`,
                })).toHaveLength(1);
            });

            fireEvent.click(screen.getAllByText(`Add Filter`)[1]);

            await waitFor(() => {
                expect(screen.getByTestId(`statusChipLabel`)).toHaveTextContent(`Status equals "Active"`);
            });

            const deleteIcon = document.querySelector(`.MuiChip-deleteIcon`) as HTMLElement;

            await waitFor(() => {
                fireEvent.click(deleteIcon);
            });

            await waitFor(() => {
                expect(screen.queryAllByText(`Status`, {
                    selector: `span`,
                })).toHaveLength(0);
                expect(screen.queryAllByText(`equals`, {
                    selector: `span`,
                })).toHaveLength(0);
                expect(screen.queryAllByText(`"Active"`, {
                    selector: `span`,
                })).toHaveLength(0);
            });
        });

        test(`clear all filters`, async() => {
            const component = <CursorTable
                {...defaultProps}
            />;

            render(component);

            fireEvent.click(screen.getByText(`Add Filter`));

            const columnSelectInput = screen.getByTestId(`ColumnSelectTextInput`) as HTMLInputElement;

            fireEvent.mouseDown(screen.getAllByRole(`button`)[0]);

            expect(screen.getByRole(`listbox`)).not.toEqual(null);

            const columnOptions = screen.getAllByRole(`option`);
            fireEvent.click(columnOptions[1]);

            await waitFor(() => {
                expect(columnSelectInput.value).toEqual(`status`);
                expect(screen.queryAllByText(`Status`, {
                    selector: `span`,
                })).toHaveLength(1);
            });

            const valueSelectInput = screen.getByTestId(`ValueSelectTextInput`) as HTMLInputElement;
            expect(valueSelectInput.value).toEqual(``);

            fireEvent.mouseDown(screen.getAllByRole(`button`)[2]);

            await waitFor(() => {
                expect(screen.getByRole(`listbox`)).not.toEqual(null);
                expect(screen.queryAllByText(`Active`, {
                    selector: `span`,
                })).toHaveLength(1);
            });

            const valueOptions = screen.getAllByRole(`option`);
            fireEvent.click(valueOptions[0]);

            await waitFor(() => {
                expect(valueSelectInput.value).toEqual(`active`);
                expect(screen.queryAllByText(`Active`, {
                    selector: `span`,
                })).toHaveLength(1);
            });

            fireEvent.click(screen.getAllByText(`Add Filter`)[1]);

            await waitFor(() => {
                expect(screen.getByTestId(`statusChipLabel`)).toHaveTextContent(`Status equals "Active"`);
            });

            fireEvent.click(screen.getByTestId(`clearFilters`));

            await waitFor(() => {
                expect(screen.queryAllByText(`Status`, {
                    selector: `span`,
                })).toHaveLength(0);
                expect(screen.queryAllByText(`equals`, {
                    selector: `span`,
                })).toHaveLength(0);
                expect(screen.queryAllByText(`"Active"`, {
                    selector: `span`,
                })).toHaveLength(0);
            });
        });

        test(`input search text`, async() => {
            const component = <CursorTable
                {...defaultProps}
            />;

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

        test(`clear search text`, async() => {
            const component = <CursorTable
                {...defaultProps}
            />;

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
            const component = <CursorTable
                {...defaultProps}
            />;

            render(component);

            let userRowsInTable = screen.getAllByTestId(`tableRow`, {
                exact: false,
            });

            expect(userRowsInTable).toHaveLength(4);
            expect(userRowsInTable[0]).toHaveTextContent(`Andres`);
            expect(userRowsInTable[1]).toHaveTextContent(`John`);

            fireEvent.click(screen.getByTestId(`givenNameSortHandler`));

            await waitFor(() => {
                userRowsInTable = screen.getAllByTestId(`tableRow`, {
                    exact: false,
                });
                expect(userRowsInTable).toHaveLength(4);
                expect(userRowsInTable[0]).toHaveTextContent(`Stephen`);
                expect(userRowsInTable[1]).toHaveTextContent(`Mike`);
            });
        });

        test(`sort desc to asc`, async () => {
            const mockedProps = {
                ...defaultProps,
                order: `desc`,
            };

            const component = <CursorTable
                {...mockedProps}
            />;

            render(component);

            let userRowsInTable = screen.getAllByTestId(`tableRow`, {
                exact: false,
            });

            expect(userRowsInTable).toHaveLength(4);
            expect(userRowsInTable[0]).toHaveTextContent(`Stephen`);
            expect(userRowsInTable[1]).toHaveTextContent(`Mike`);

            fireEvent.click(screen.getByTestId(`givenNameSortHandler`));

            await waitFor(() => {
                userRowsInTable = screen.getAllByTestId(`tableRow`, {
                    exact: false,
                });
                expect(userRowsInTable).toHaveLength(4);
                expect(userRowsInTable[0]).toHaveTextContent(`Andres`);
                expect(userRowsInTable[1]).toHaveTextContent(`John`);
            });
        });
    });
});
