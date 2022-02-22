import AlertContext from "./Context";
import AlertDialog,
{ Props as DialogOptions } from "./Dialog";
import React,
{
    ReactNode,
    useCallback,
    useState,
} from "react";

export interface DefaultOptions extends DialogOptions {
    title: ReactNode;
    content: ReactNode;
    okLabel: string;
}

const DEFAULT_OPTIONS: DefaultOptions = {
    content: `Something happened`,
    title: `Alert!`,
    okLabel: `OK`,
    maxWidth: `xs`,
};

type PromiseResolve = (value: boolean | PromiseLike<boolean | undefined> | undefined) => void

interface Props extends DialogOptions {
    children: React.ReactNode;
}

export default function AlertDialogProvider (props: Props) {
    const {
        children,
        ...userDefaultOptions
    } = props;
    const [ options, setOptions ] = useState({
        ...DEFAULT_OPTIONS,
        ...userDefaultOptions,
    });
    const [ resolves, setResolve ] = useState<PromiseResolve[]>([]);

    const alert = useCallback((options: DialogOptions): Promise<boolean | undefined> => {
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
            <AlertContext.Provider value={alert}>
                {children}
            </AlertContext.Provider>
            <AlertDialog
                open={resolves.length === 1}
                onClose={handleClose}
                {...options}
            />
        </>
    );
}
