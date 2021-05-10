import { SpreadsheetValidtionError } from "./Base";
import ErrorField from "./ErrorField";
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

const hasRowError = (errors: SpreadsheetValidtionError[], row: number, columns: string[]) => {
    return errors.find((error) => error.row === row && !columns?.includes(error.column ?? ``));
};

const rowContainsError = (errors: SpreadsheetValidtionError[], row: number) => {
    return errors.find((error) => error.row === row);
};

const hasColumnError = (errors: SpreadsheetValidtionError[], column: string) => {
    return errors.find((error) => error.column === column);
};

const hasFieldError = (errors: SpreadsheetValidtionError[], row: number, column: string) => {
    return errors.find((error) => error.row === row && error.column === column);
};

interface Props {
    className?: string;
    file: File;
    errors: SpreadsheetValidtionError[];
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

    const buildField = (fieldText: ReactNode, error: SpreadsheetValidtionError | undefined) => {
        if (error) return (
            <ErrorField
                fieldText={fieldText}
                error={error}
            />
        );
        return <Typography>{fieldText}</Typography>;
    };

    return (
        <div className={clsx(className, classes.root)}>
            <table className={classes.table}>
                <thead>
                    <tr>
                        <th className={clsx(classes.cell, classes.header)} />
                        {columns.map((columnName, i) => (
                            <th
                                key={`column-${i}`}
                                className={clsx(classes.cell, classes.header, {
                                    [classes.error]: hasColumnError(errors, columns[i]),
                                })}
                            >
                                <Typography>{columnName}</Typography>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, i) => {
                        const rowError = hasRowError(errors, i + 1, columns);
                        return <tr key={`row-${i}`}>
                            <td
                                className={clsx(classes.cell, classes.header, {
                                    [classes.error]: rowContainsError(errors, i + 1),
                                })}
                            >
                                {buildField(i + 1, rowError)}
                            </td>
                            {row.map((field, j) => {
                                const fieldError = hasFieldError(errors, i + 1, columns[j]);
                                return <td
                                    key={`field-${i}-${j}`}
                                    className={clsx(classes.cell, {
                                        [classes.error]: (rowError && !fieldError) || fieldError,
                                    })}
                                >
                                    {buildField(field, fieldError)}
                                </td>;
                            })}
                        </tr>;
                    })}
                </tbody>
            </table>
        </div>
    );
}
