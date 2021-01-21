import React,
{
    ReactNode,
    useCallback,
    useState,
} from "react";
import PromptDialog,
{ Props as DialogOptions } from "./Dialog";
import PromptContext from "./Context";

interface DefaultOptions extends DialogOptions {
    title: ReactNode;
    okLabel: string;
    cancelLabel: string;
}

const DEFAULT_OPTIONS: DefaultOptions = {
    title: `Enter text`,
    okLabel: `OK`,
    cancelLabel: `Cancel`,
    maxWidth: `xs`,
};

type PromiseResolve = (value: boolean | PromiseLike<boolean | undefined> | undefined) => void

interface Props extends DialogOptions {
    children: React.ReactNode;
}

export default function PromptDialogProvider (props: Props) {
    const {
        children,
        ...userDefaultOptions
    } = props;
    const [ options, setOptions ] = useState({
        ...DEFAULT_OPTIONS,
        ...userDefaultOptions,
    });
    const [ resolves, setResolve ] = useState<PromiseResolve[]>([]);

    const prompt = useCallback((options: DialogOptions): Promise<boolean | undefined> =>  {
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
            <PromptContext.Provider value={prompt}>
                {children}
            </PromptContext.Provider>
            <PromptDialog
                open={resolves.length === 1}
                onClose={handleClose}
                {...options}
            />
        </>
    );
}
