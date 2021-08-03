import ErrorField from "./ErrorField";
import { SpreadsheetValidationError } from "./types";
import {
    createStyles,
    lighten,
    makeStyles,
    Typography,
} from "@material-ui/core";
import clsx from "clsx";
import React,
{
    ReactNode,
    useEffect,
    useState,
} from "react";

const useStyles = makeStyles((theme) => createStyles({
    root: {
        backgroundColor: theme.palette.grey[100],
        width: `100%`,
        height: `100%`,
        overflow: `auto`,
    },
    table: {
        borderSpacing: 0,
        borderCollapse: `collapse`,
        borderLeft: `1px solid ${theme.palette.grey[500]}`,
        borderTop: `1px solid ${theme.palette.grey[500]}`,
    },
    error: {},
    cell: {
        boxShadow: `inset -1px -1px 0px ${theme.palette.grey[500]}`,
        padding: theme.spacing(1, 2),
        borderColor: theme.palette.grey[500],
        backgroundColor: theme.palette.common.white,
        "&$error": {
            backgroundColor: lighten(theme.palette.error.main, 0.66),
        },
        "&$header": {
            backgroundColor: theme.palette.grey[200],
            "&$error": {
                backgroundColor: lighten(theme.palette.error.main, 0.5),
            },
            "& *": {
                fontWeight: 600,
            },
        },
    },
    header: {
        position: `sticky`,
        top: -1,
        left: -1,
    },

}));

const findGeneralErrors = (errors: SpreadsheetValidationError[]) => {
    return errors.filter((error) => error.row === undefined && error.column === undefined);
};

const findRowErrors = (errors: SpreadsheetValidationError[], row: number, columns: string[]) => {
    return errors.filter((error) => error.row === row && !columns?.includes(error.column ?? ``));
};

const hasRowError = (errors: SpreadsheetValidationError[], row: number) => {
    return !!errors.find((error) => error.row === row);
};

const findColumnErrors = (errors: SpreadsheetValidationError[], column: string) => {
    return errors.filter((error) => error.column === column && !error.row);
};

const hasColumnError = (errors: SpreadsheetValidationError[], column: string) => {
    return !!errors.find((error) => error.column === column);
};

const findFieldErrors = (errors: SpreadsheetValidationError[], row: number, column: string) => {
    return errors.filter((error) => error.row === row && error.column === column);
};

export interface Props {
    className?: string;
    file: File;
    errors: SpreadsheetValidationError[];
    onParseFile: (file: File) => Promise<string[][]>;
}

export default function PreviewSpreadsheet (props: Props) {
    const {
        className,
        file,
        errors,
        onParseFile,
    } = props;
    const classes = useStyles();
    const [ data, setData ] = useState<string[][]>();

    const loadSpreadsheet = async () => {
        const parsedData = await onParseFile(file);
        setData((data) => [ ...data ? data : [], ...parsedData ]);
    };

    useEffect(() => {
        loadSpreadsheet();
    }, []);

    const columns = data?.slice(0, 1)[0]?.map((c) => c.trim()) ?? [];
    const rows = data?.slice(1) ?? [];

    const buildField = (fieldText: ReactNode, errors: SpreadsheetValidationError[]) => {
        if (errors.length > 0) return (
            <ErrorField
                fieldText={fieldText}
                errors={errors}
            />
        );
        return <Typography>{fieldText}</Typography>;
    };

    const generalErrors = findGeneralErrors(errors);

    return (
        <div
            data-testid="preview"
            className={clsx(className, classes.root)}>
            <table className={classes.table}>
                <thead>
                    <tr>
                        <th className={clsx(classes.cell, classes.header, {
                            [classes.error]: generalErrors.length > 0,
                        })} >
                            {buildField(``, generalErrors)}
                        </th>
                        {columns.map((columnName, i) => {
                            const columnErrors = findColumnErrors(errors, columnName);
                            return (
                                <th
                                    key={`column-${i}`}
                                    className={clsx(classes.cell, classes.header, {
                                        [classes.error]: hasColumnError(errors, columnName),
                                    })}
                                >
                                    {buildField(columnName, columnErrors)}
                                </th>
                            );
                        })}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, i) => {
                        const rowErrors = findRowErrors(errors, i + 1, columns);
                        return <tr key={`row-${i}`}>
                            <td
                                className={clsx(classes.cell, classes.header, {
                                    [classes.error]: hasRowError(errors, i + 1),
                                })}
                            >
                                {buildField(i + 1, rowErrors)}
                            </td>
                            {row.map((field, j) => {
                                const fieldErrors = findFieldErrors(errors, i + 1, columns[j]);
                                return <td
                                    key={`field-${i}-${j}`}
                                    className={clsx(classes.cell, {
                                        [classes.error]: (rowErrors.length > 0 && fieldErrors.length === 0) || fieldErrors.length > 0,
                                    })}
                                >
                                    {buildField(field, fieldErrors)}
                                </td>;
                            })}
                        </tr>;
                    })}
                </tbody>
            </table>
        </div>
    );
}
