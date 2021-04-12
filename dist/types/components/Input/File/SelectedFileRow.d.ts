/// <reference types="react" />
export interface Props {
    className?: string;
    file: File;
    error?: string;
    removeButtonTooltip?: string;
    uploadButtonTooltip?: string;
    uploadErrorMessage?: string;
    uploadSuccessMessage?: string;
    locales?: string | string[];
    onClickRemove?: () => void;
    onClickUpload: () => void | Promise<void>;
}
export default function SelectedFileRow(props: Props): JSX.Element;
