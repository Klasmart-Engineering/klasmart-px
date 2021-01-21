import React,
{
    useEffect,
    useState,
} from "react";
import {
    Button,
    createStyles,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    makeStyles,
    TextField,
} from "@material-ui/core";
import DialogTitle from "../DialogTitle";
import {
    CancelableDialog,
    CommonDialog,
    Openable,
} from "../shared";

const useStyles = makeStyles((theme) => createStyles({}));

export type Input = `text` | `number` | `password` | `date` | `datetime-local` | `email` | `time` | `month` | `tel` | `url` | `week`

export interface Props extends CommonDialog, CancelableDialog {
    label?: string;
    placeholder?: string;
    inputType?: Input;
}

export default function ConfirmDialog (props: Props & Openable<any>) {
    const {
        variant,
        open,
        title,
        hideIcon,
        label,
        placeholder,
        inputType,
        okLabel,
        cancelLabel,
        content,
        onClose,

        ...rest
    } = props;
    const classes = useStyles();
    const [ value, setValue ] = useState(``);
    useEffect(() => setValue(``), [ open ]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();
        onClose(value);
    };

    return (
        <>
            <Dialog
                fullWidth
                open={open}
                onClose={() => onClose()}
                {...rest}
            >
                <DialogTitle
                    title={title}
                    variant={variant}
                    hideIcon={hideIcon}
                />
                <DialogContent>
                    {content && <DialogContentText>{content}</DialogContentText>}
                    <form onSubmit={handleSubmit}>
                        <TextField
                            autoFocus
                            fullWidth
                            variant="outlined"
                            label={label}
                            placeholder={placeholder}
                            type={inputType}
                            value={value}
                            onChange={(e) => setValue(e.currentTarget.value)}
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button
                        color="primary"
                        onClick={() => onClose(false)}
                    >
                        {cancelLabel}
                    </Button>
                    <Button
                        type="submit"
                        color="primary"
                        onClick={() => onClose(value)}
                    >
                        {okLabel}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
