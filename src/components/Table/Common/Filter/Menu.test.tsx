import { render } from "../../../../../test/themeProviderRender";
import TableFilterMenu,
{ TableFilterMenuProps } from "./Menu";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

interface TableRow {
    name: string;
    email: string;
    organizationRole: string;
}

const defaultProps: TableFilterMenuProps<TableRow> = {
    anchorEl: document.createElement(`div`),
    onClose: jest.fn(),
    tableFilters: [],
};

const options = [
    {
        value: `email1@company.com`,
        label: `email1@company.com`,
    },
    {
        value: `email2@company.com`,
        label: `email2@company.com`,
    },
    {
        value: `email3@company.com`,
        label: `email3@company.com`,
    },
];

const selectColumn = (label: string) => {
    userEvent.click(screen.getByLabelText(`Column`));
    userEvent.click(screen.getByRole(`option`, {
        name: label,
    }));
};

const selectOperator = (label: string) => {
    userEvent.click(screen.getByLabelText(`Operator`));
    userEvent.click(screen.getByRole(`option`, {
        name: label,
    }));
};

const selectValue = (label: string) => {
    userEvent.click(screen.getByLabelText(`Value`));
    userEvent.click(screen.getByRole(`option`, {
        name: label,
    }));
};

const selectValues = (labels: string[], options?: {
    previousLabels: string[];
}) => {
    userEvent.click(screen.getByLabelText(`Values`));

    const previousLabels = (options?.previousLabels ?? []) as string[];
    if (previousLabels.length > 0) {
        for (const label of previousLabels) {
            userEvent.click(screen.getByRole(`option`, {
                name: label,
            }));
        }
    }

    for (const label of labels) {
        userEvent.click(screen.getByRole(`option`, {
            name: label,
        }));
    }
};

const inputValue = (value: string) => {
    const input = screen.getByLabelText(`Value`);
    userEvent.clear(input);
    userEvent.type(input, value);
};

const addFilter = (options = {
    hidden: false,
}) => {
    userEvent.click(screen.getByRole(`button`, {
        name: `Add Filter`,
        hidden: options?.hidden, // TODO: click outside selector list, presentation currently covers the screen
    }));
};

const saveFilter = (options = {
    hidden: false,
}) => {
    userEvent.click(screen.getByRole(`button`, {
        name: `Save Filter`,
        hidden: options?.hidden, // TODO: click outside selector list, presentation currently covers the screen
    }));
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

describe(`Menu`, () => {
    test(`Add single combo box filter`, () => {
        const columnId = `email`;
        const operatorValue1 = `equals`;
        const operatorValue2 = `contains`;
        const filterItem = options[0];

        const props: TableFilterMenuProps<TableRow> = {
            ...defaultProps,
            tableFilters: [
                {
                    id: columnId,
                    label: `Email`,
                    operators: [
                        {
                            value: operatorValue1,
                            label: `equals`,
                            valueComponent: `text-field`,
                        },
                        {
                            value: operatorValue2,
                            label: `contains`,
                            valueComponent: `combo-box`,
                            options: options,
                        },
                    ],
                },
            ],
        };

        const tableFilter = props.tableFilters[0];
        const operator = tableFilter.operators[1];

        render(<TableFilterMenu {...props} />);

        selectColumn(tableFilter.label);
        selectOperator(operator.label);
        selectValue(filterItem.label);
        addFilter();

        expect(props.onClose)
            .toHaveBeenCalledWith({
                columnId: tableFilter.id,
                operatorValue: operator.value,
                values: [ filterItem ],
            });
    });

    test(`Load edit single combo filter`, () => {
        const columnId = `email`;
        const operatorValue = `contains`;
        const filterValue = options[0];

        const props: TableFilterMenuProps<TableRow> = {
            ...defaultProps,
            tableFilters: [
                {
                    id: columnId,
                    label: `Email`,
                    operators: [
                        {
                            value: operatorValue,
                            label: `contains`,
                            valueComponent: `combo-box`,
                            options: options,
                        },
                    ],
                },
            ],
            editingFilter: {
                columnId: columnId,
                operatorValue: operatorValue,
                values: [ filterValue ],
            },
        };

        render(<TableFilterMenu {...props} />);

        expect(screen.getByTestId(`ColumnSelectTextInput`))
            .toHaveValue(columnId);
        expect(screen.getByTestId(`OperatorSelectTextInput`))
            .toHaveValue(operatorValue);
        expect(screen.getByLabelText(`Value`))
            .toHaveValue(filterValue.value);
    });

    test(`Edit single combo box filter`, () => {
        const columnId = `email`;
        const operatorValue1 = `equals`;
        const operatorValue2 = `contains`;
        const filterItem = options[0];
        const newFilterItem = options[2];

        const props: TableFilterMenuProps<TableRow> = {
            ...defaultProps,
            tableFilters: [
                {
                    id: columnId,
                    label: `Email`,
                    operators: [
                        {
                            value: operatorValue1,
                            label: `equals`,
                            valueComponent: `text-field`,
                        },
                        {
                            value: operatorValue2,
                            label: `contains`,
                            valueComponent: `combo-box`,
                            options: options,
                        },
                    ],
                },
            ],
            editingFilter: {
                columnId,
                operatorValue: operatorValue2,
                values: [ filterItem ],
            },
        };

        const tableFilter = props.tableFilters[0];
        const operator = tableFilter.operators[1];

        render(<TableFilterMenu {...props} />);

        selectColumn(tableFilter.label);
        selectOperator(operator.label);
        selectValue(newFilterItem.label);
        saveFilter();

        expect(props.onClose)
            .toHaveBeenCalledWith({
                columnId: tableFilter.id,
                operatorValue: operator.value,
                values: [ newFilterItem ],
            });
    });

    test(`Add multi combo box filter`, () => {
        const columnId = `email`;
        const operatorValue1 = `equals`;
        const operatorValue2 = `contains`;
        const filterValues = [ options[0], options[2] ];

        const props: TableFilterMenuProps<TableRow> = {
            ...defaultProps,
            tableFilters: [
                {
                    id: columnId,
                    label: `Email`,
                    operators: [
                        {
                            value: operatorValue1,
                            label: `equals`,
                            valueComponent: `text-field`,
                        },
                        {
                            value: operatorValue2,
                            label: `contains`,
                            multipleValues: true,
                            valueComponent: `combo-box`,
                            options: options,
                        },
                    ],
                },
            ],
        };

        const tableFilter = props.tableFilters[0];
        const operator = tableFilter.operators[1];

        render(<TableFilterMenu {...props} />);

        selectColumn(tableFilter.label);
        selectOperator(operator.label);
        selectValues(filterValues.map((value) => value.label));
        addFilter();

        expect(props.onClose)
            .toHaveBeenCalledWith({
                columnId: tableFilter.id,
                operatorValue: operator.value,
                values: filterValues,
            });
    });

    test(`Load edit multi combo filter`, () => {
        const columnId = `email`;
        const operatorValue = `contains`;
        const filterValues = [ options[0], options[2] ];

        const props: TableFilterMenuProps<TableRow> = {
            ...defaultProps,
            tableFilters: [
                {
                    id: columnId,
                    label: `Email`,
                    operators: [
                        {
                            value: operatorValue,
                            label: `contains`,
                            multipleValues: true,
                            valueComponent: `combo-box`,
                            options: options,
                        },
                    ],
                },
            ],
            editingFilter: {
                columnId: columnId,
                operatorValue: operatorValue,
                values: filterValues,
            },
        };

        render(<TableFilterMenu {...props} />);

        expect(screen.getByTestId(`ColumnSelectTextInput`))
            .toHaveValue(columnId);
        expect(screen.getByTestId(`OperatorSelectTextInput`))
            .toHaveValue(operatorValue);
        for (const filterValue of filterValues) {
            expect(screen.getByRole(`button`, {
                name: filterValue.label,
            }))
                .toBeInTheDocument();
        }
    });

    test(`Edit multi combo box filter`, () => {
        const columnId = `email`;
        const operatorValue1 = `equals`;
        const operatorValue2 = `contains`;
        const filterValues = [ options[0], options[2] ];
        const newFilterValues = [ options[1] ];

        const props: TableFilterMenuProps<TableRow> = {
            ...defaultProps,
            tableFilters: [
                {
                    id: columnId,
                    label: `Email`,
                    operators: [
                        {
                            value: operatorValue1,
                            label: `equals`,
                            valueComponent: `text-field`,
                        },
                        {
                            value: operatorValue2,
                            label: `contains`,
                            multipleValues: true,
                            valueComponent: `combo-box`,
                            options: options,
                        },
                    ],
                },
            ],
            editingFilter: {
                columnId,
                operatorValue: operatorValue2,
                values: filterValues,
            },
        };

        const tableFilter = props.tableFilters[0];
        const operator = tableFilter.operators[1];

        render(<TableFilterMenu {...props} />);

        selectColumn(tableFilter.label);
        selectOperator(operator.label);
        selectValues(newFilterValues.map((value) => value.label), {
            previousLabels: filterValues.map((value) => value.label),
        });
        saveFilter();

        expect(props.onClose)
            .toHaveBeenCalledWith({
                columnId: tableFilter.id,
                operatorValue: operator.value,
                values: newFilterValues,
            });
    });

    test(`Add single select filter`, () => {
        const columnId = `email`;
        const operatorValue1 = `equals`;
        const operatorValue2 = `contains`;
        const filterItem = options[0];

        const props: TableFilterMenuProps<TableRow> = {
            ...defaultProps,
            tableFilters: [
                {
                    id: columnId,
                    label: `Email`,
                    operators: [
                        {
                            value: operatorValue1,
                            label: `equals`,
                            valueComponent: `text-field`,
                        },
                        {
                            value: operatorValue2,
                            label: `contains`,
                            valueComponent: `select`,
                            options: options,
                        },
                    ],
                },
            ],
        };

        const tableFilter = props.tableFilters[0];
        const operator = tableFilter.operators[1];

        render(<TableFilterMenu {...props} />);

        selectColumn(tableFilter.label);
        selectOperator(operator.label);
        selectValue(filterItem.label);
        addFilter();

        expect(props.onClose)
            .toHaveBeenCalledWith({
                columnId: tableFilter.id,
                operatorValue: operator.value,
                values: [ filterItem ],
            });
    });

    test(`Load edit single select filter`, () => {
        const columnId = `email`;
        const operatorValue = `contains`;
        const filterValue = options[0];

        const props: TableFilterMenuProps<TableRow> = {
            ...defaultProps,
            tableFilters: [
                {
                    id: columnId,
                    label: `Email`,
                    operators: [
                        {
                            value: operatorValue,
                            label: `contains`,
                            valueComponent: `select`,
                            options: options,
                        },
                    ],
                },
            ],
            editingFilter: {
                columnId: columnId,
                operatorValue: operatorValue,
                values: [ filterValue ],
            },
        };

        render(<TableFilterMenu {...props} />);

        expect(screen.getByTestId(`ColumnSelectTextInput`))
            .toHaveValue(columnId);
        expect(screen.getByTestId(`OperatorSelectTextInput`))
            .toHaveValue(operatorValue);
        expect(screen.getByRole(`button`, {
            name: `Value ${filterValue.label}`,
        }))
            .toBeInTheDocument();
    });

    test(`Edit single select filter`, () => {
        const columnId = `email`;
        const operatorValue1 = `equals`;
        const operatorValue2 = `contains`;
        const filterItem = options[0];
        const newFilterItem = options[2];

        const props: TableFilterMenuProps<TableRow> = {
            ...defaultProps,
            tableFilters: [
                {
                    id: columnId,
                    label: `Email`,
                    operators: [
                        {
                            value: operatorValue1,
                            label: `equals`,
                            valueComponent: `text-field`,
                        },
                        {
                            value: operatorValue2,
                            label: `contains`,
                            valueComponent: `select`,
                            options: options,
                        },
                    ],
                },
            ],
            editingFilter: {
                columnId,
                operatorValue: operatorValue2,
                values: [ filterItem ],
            },
        };

        const tableFilter = props.tableFilters[0];
        const operator = tableFilter.operators[1];

        render(<TableFilterMenu {...props} />);

        selectColumn(tableFilter.label);
        selectOperator(operator.label);
        selectValue(newFilterItem.label);
        saveFilter();

        expect(props.onClose)
            .toHaveBeenCalledWith({
                columnId: tableFilter.id,
                operatorValue: operator.value,
                values: [ newFilterItem ],
            });
    });

    test(`Add multi select filter`, () => {
        const columnId = `email`;
        const operatorValue1 = `equals`;
        const operatorValue2 = `contains`;
        const filterValues = [ options[0], options[2] ];

        const props: TableFilterMenuProps<TableRow> = {
            ...defaultProps,
            tableFilters: [
                {
                    id: columnId,
                    label: `Email`,
                    operators: [
                        {
                            value: operatorValue1,
                            label: `equals`,
                            valueComponent: `text-field`,
                        },
                        {
                            value: operatorValue2,
                            label: `contains`,
                            multipleValues: true,
                            valueComponent: `select`,
                            options: options,
                        },
                    ],
                },
            ],
        };

        const tableFilter = props.tableFilters[0];
        const operator = tableFilter.operators[1];

        render(<TableFilterMenu {...props} />);

        selectColumn(tableFilter.label);
        selectOperator(operator.label);
        selectValues(filterValues.map((value) => value.label));
        addFilter({
            hidden: true,
        });

        expect(props.onClose)
            .toHaveBeenCalledWith({
                columnId: tableFilter.id,
                operatorValue: operator.value,
                values: filterValues,
            });
    });

    test(`Load edit multi select filter`, () => {
        const columnId = `email`;
        const operatorValue = `contains`;
        const filterValues = [ options[0], options[2] ];

        const props: TableFilterMenuProps<TableRow> = {
            ...defaultProps,
            tableFilters: [
                {
                    id: columnId,
                    label: `Email`,
                    operators: [
                        {
                            value: operatorValue,
                            label: `contains`,
                            multipleValues: true,
                            valueComponent: `select`,
                            options: options,
                        },
                    ],
                },
            ],
            editingFilter: {
                columnId: columnId,
                operatorValue: operatorValue,
                values: filterValues,
            },
        };

        render(<TableFilterMenu {...props} />);

        expect(screen.getByTestId(`ColumnSelectTextInput`))
            .toHaveValue(columnId);
        expect(screen.getByTestId(`OperatorSelectTextInput`))
            .toHaveValue(operatorValue);
        for (const filterValue of filterValues) {
            expect(screen.getByRole(`button`, {
                name: filterValue.label,
            }))
                .toBeInTheDocument();
        }
    });

    test(`Edit multi select filter`, () => {
        const columnId = `email`;
        const operatorValue1 = `equals`;
        const operatorValue2 = `contains`;
        const filterValues = [ options[0], options[2] ];
        const newFilterValues = [ options[1] ];

        const props: TableFilterMenuProps<TableRow> = {
            ...defaultProps,
            tableFilters: [
                {
                    id: columnId,
                    label: `Email`,
                    operators: [
                        {
                            value: operatorValue1,
                            label: `equals`,
                            valueComponent: `text-field`,
                        },
                        {
                            value: operatorValue2,
                            label: `contains`,
                            multipleValues: true,
                            valueComponent: `select`,
                            options: options,
                        },
                    ],
                },
            ],
            editingFilter: {
                columnId,
                operatorValue: operatorValue2,
                values: filterValues,
            },
        };

        const tableFilter = props.tableFilters[0];
        const operator = tableFilter.operators[1];

        render(<TableFilterMenu {...props} />);

        selectColumn(tableFilter.label);
        selectOperator(operator.label);
        selectValues(newFilterValues.map((value) => value.label), {
            previousLabels: filterValues.map((value) => value.label),
        });
        saveFilter({
            hidden: true,
        });

        expect(props.onClose)
            .toHaveBeenCalledWith({
                columnId: tableFilter.id,
                operatorValue: operator.value,
                values: newFilterValues.map((value) => value.value),
            });
    });

    test(`Add text field filter`, () => {
        const filterValue = `test@kidsloop.live`;
        const columnId = `email`;
        const operatorValue1 = `equals`;
        const operatorValue2 = `contains`;

        const props: TableFilterMenuProps<TableRow> = {
            ...defaultProps,
            tableFilters: [
                {
                    id: columnId,
                    label: `Email`,
                    operators: [
                        {
                            value: operatorValue1,
                            label: `equals`,
                            valueComponent: `text-field`,
                        },
                        {
                            value: operatorValue2,
                            label: `contains`,
                            valueComponent: `text-field`,
                        },
                    ],
                },
            ],
        };

        const tableFilter = props.tableFilters[0];
        const operator = tableFilter.operators[1];

        render(<TableFilterMenu {...props} />);

        selectColumn(tableFilter.label);
        selectOperator(operator.label);
        inputValue(filterValue);
        addFilter();

        expect(props.onClose)
            .toHaveBeenCalledWith({
                columnId: tableFilter.id,
                operatorValue: operator.value,
                values: [ filterValue ],
            });
    });

    test(`Load edit text field filter`, () => {
        const filterValue = `test@kidsloop.live`;
        const columnId = `email`;
        const operatorValue = `contains`;

        const props: TableFilterMenuProps<TableRow> = {
            ...defaultProps,
            tableFilters: [
                {
                    id: columnId,
                    label: `Email`,
                    operators: [
                        {
                            value: operatorValue,
                            label: `contains`,
                            valueComponent: `text-field`,
                        },
                    ],
                },
            ],
            editingFilter: {
                columnId: columnId,
                operatorValue: operatorValue,
                values: [ filterValue ],
            },
        };

        render(<TableFilterMenu {...props} />);

        expect(screen.getByTestId(`ColumnSelectTextInput`))
            .toHaveValue(columnId);
        expect(screen.getByTestId(`OperatorSelectTextInput`))
            .toHaveValue(operatorValue);
        expect(screen.getByLabelText(`Value`))
            .toHaveValue(filterValue);
    });

    test(`Edit text field filter`, () => {
        const filterValue = `test@kidsloop.live`;
        const columnId = `email`;
        const operatorValue1 = `equals`;
        const operatorValue2 = `contains`;

        const props: TableFilterMenuProps<TableRow> = {
            ...defaultProps,
            tableFilters: [
                {
                    id: columnId,
                    label: `Email`,
                    operators: [
                        {
                            value: operatorValue1,
                            label: `equals`,
                            valueComponent: `text-field`,
                        },
                        {
                            value: operatorValue2,
                            label: `contains`,
                            valueComponent: `text-field`,
                        },
                    ],
                },
            ],
            editingFilter: {
                columnId: columnId,
                operatorValue: operatorValue2,
                values: [ filterValue ],
            },
        };

        const tableFilter = props.tableFilters[0];
        const operator = tableFilter.operators[1];

        const newUserEmail = `new@kidsloop.live`;

        render(<TableFilterMenu {...props} />);

        selectColumn(tableFilter.label);
        selectOperator(operator.label);
        inputValue(newUserEmail);
        saveFilter();

        expect(props.onClose)
            .toHaveBeenCalledWith({
                columnId: tableFilter.id,
                operatorValue: operator.value,
                values: [ newUserEmail ],
            });
    });
});
