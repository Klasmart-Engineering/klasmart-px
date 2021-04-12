/// <reference types="react" />
export interface Props {
    accept?: string;
    maxSize?: number;
    label?: string;
    typeRejectedError?: string;
    exceedsMaxSizeError?: (fileSize: number, maxSize: number) => string;
    onFileAdded: (file: File) => void;
    onFileRejected: (file: File, error: string) => void;
}
export default function Dropzone(props: Props): JSX.Element;