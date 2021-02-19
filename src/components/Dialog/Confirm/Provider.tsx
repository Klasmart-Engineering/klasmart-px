import ConfirmContext from "./Context";
import ConfirmDialog,
{ Props as DialogOptions } from "./Dialog";
import React,
{
    ReactNode,
    useCallback,
    useState,
} from "react";

interface DefaultOptions extends DialogOptions {
    title: ReactNode;
    content: ReactNode;
    okLabel: string;
    cancelLabel: string;
}

const DEFAULT_OPTIONS: DefaultOptions = {
    content: `Are you sure?`,
    title: `Confirm`,
    okLabel: `OK`,
    cancelLabel: `Cancel`,
    maxWidth: `xs`,
};

type PromiseResolve = (value: boolean | PromiseLike<boolean | undefined> | undefined) => void

interface Props extends DialogOptions {
    children: React.ReactNode;
}

export default function ConfirmDialogProvider (props: Props) {
    const {
        children,
        ...userDefaultOptions
    } = props;
    const [ options, setOptions ] = useState({
        ...DEFAULT_OPTIONS,
        ...userDefaultOptions,
    });
    const [ resolves, setResolve ] = useState<PromiseResolve[]>([]);

    const confirm = useCallback((options: DialogOptions): Promise<boolean | undefined> =>  {
        const dialogOptions = {
            ...DEFAULT_OPTIONS,
            ...userDefaultOptions,
            ...options,
        };
        return new Promise((resolve) => {
            setResolve([ resolve ]);
            setOptions(dialogOptions);
        });
    }, []);

    const handleClose = (value?: boolean) => {
        resolves[0]?.(value);
        setResolve([]);
    };

    return (
        <>
            <ConfirmContext.Provider value={confirm}>
                {children}
            </ConfirmContext.Provider>
            <ConfirmDialog
                open={resolves.length === 1}
                onClose={handleClose}
                {...options}
            />
        </>
    );
}
