import Button from "../../Button";
import TextField from "../../Input/TextField";
import DialogContent from "../DialogContent";
import DialogTitle from "../DialogTitle";
import {
    CancelableDialog,
    CommonDialog,
    Openable,
} from "../shared";
import {
    createStyles,
    Dialog,
    DialogActions,
    DialogContent as Content,
    makeStyles,
} from "@material-ui/core";
import React,
{
    useEffect,
    useState,
} from "react";

const useStyles = makeStyles((theme) => createStyles({}));

export type Input = `text` | `number` | `password` | `date` | `datetime-local` | `email` | `time` | `month` | `tel` | `url` | `week`

export interface Props extends CommonDialog, CancelableDialog {
    label?: string;
    placeholder?: string;
    inputType?: Input;
    validations?: ((input: unknown) => true | string)[];
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
        validations,
        onClose,

        ...rest
    } = props;
    const classes = useStyles();
    const [ value, setValue ] = useState(``);
    const [ isValid, setIsValid ] = useState(false);
    useEffect(() => setValue(``), [ open ]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (!isValid) return;
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
                {content && <DialogContent content={content} />}
                <Content>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            autoFocus
                            fullWidth
                            label={label}
                            placeholder={placeholder}
                            type={inputType}
                            value={value}
                            validations={validations}
                            onChange={setValue}
                            onValidate={setIsValid}
                        />
                    </form>
                </Content>
                <DialogActions>
                    <Button
                        label={cancelLabel}
                        color="primary"
                        onClick={() => onClose(false)}
                    />
                    <Button
                        label={okLabel}
                        type="submit"
                        color="primary"
                        disabled={!isValid}
                        onClick={() => onClose(value)}
                    />
                </DialogActions>
            </Dialog>
        </>
    );
}
