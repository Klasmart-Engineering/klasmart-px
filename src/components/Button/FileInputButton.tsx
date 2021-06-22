import Button,
{ Props as ButtonProps } from './Button';
import React,
{
    useEffect,
    useState,
} from 'react';

interface ErrorMessages {
    noFileError: string;
    fileSizeTooBigError: string;
    wrongFileTypeUploadError: string;
}

export interface Props extends ButtonProps {
    accept?: string | string[];
    errorMessages?: ErrorMessages;
    fileSizeLimitInKB?: number;
    onFileChange: (file: File) => void;
    onError?: (error: string) => void;
}

export default function FileInputButton (props: Props) {
    const {
        accept = [],
        label,
        variant = `outlined`,
        size = `large`,
        color =  `primary`,
        fileSizeLimitInKB = 2097152,
        errorMessages = {
            noFileError: `No File Found`,
            fileSizeTooBigError: `The maximum file size is 2MB`,
            wrongFileTypeUploadError: `This image file must be in the correct format`,
        },
        onClick,
        onFileChange,
        onError,
    } = props;

    const [ errorMessage, setErrorMessage ] = useState(``);

    const acceptedMimeTypes = Array.isArray(accept) ? accept : [ accept ];

    const hiddenFileInput = React.useRef<HTMLInputElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        onClick?.(event);
        hiddenFileInput.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const file = event.target.files?.[0];
            if (!file) return setErrorMessage(errorMessages?.noFileError);
            if (!acceptedMimeTypes.some(extension => extension === file.type)) return setErrorMessage(errorMessages?.wrongFileTypeUploadError);
            if (file.size > fileSizeLimitInKB) return setErrorMessage(errorMessages?.fileSizeTooBigError);
            setErrorMessage(``);
            return onFileChange(file);
        } catch (e) {
            onError?.(errorMessages?.noFileError);
        }
    };

    useEffect(() => {
        onError?.(errorMessage);
    }, [ errorMessage ]);

    return (
        <>
            <input
                ref={hiddenFileInput}
                hidden
                type="file"
                accept={acceptedMimeTypes.join(`,`)}
                onChange={handleFileChange}
            />
            <Button
                label={label}
                variant={variant}
                color={color}
                size={size}
                onClick={handleClick}
            />
        </>
    );
}
