import { gif } from "../../../../../test/image";
import Base,
{
    Props,
    SpreadsheetValidationError,
} from "./Base";
import {
    expectHasErrorIcon,
    expectPreviewData,
    hasErrorStyling,
    waitForPreviewToParse,
} from "./Preview.test";
import {
    render as actualRender,
    screen,
    waitFor,
    waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import { AssertionError } from "assert";
import each from "jest-each";
import React from "react";
import { FileWithPath } from "react-dropzone";

beforeEach(() => jest.clearAllMocks());

const defaultColumns = [ `Name`, `Email` ];

const spreadsheetErrors: SpreadsheetValidationError[] = [
    {
        row: 1,
        column: `Name`,
        message: `Too short`,
    },
    {
        row: 2,
        column: `Nonexistant`,
        message: `Row level error`,
    },
    {
        column: `Email`,
        message: `Column level error`,
    },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const defaultOnFileUploadError = jest.fn((error: any, isDryRun: boolean) => spreadsheetErrors);

const props: Required<Props> = {
    accept: `text/csv`,
    maxFileSize: 2_000,
    locales: `en`,
    dropzoneLabel:`Upload a file`,
    noItemsLabel: `No items`,
    removeButtonTooltip:`remove-btn`,
    uploadButtonTooltip:`upload-btn`,
    uploadError: `Upload failed`,
    uploadSuccessMessage: `Upload succeeded`,
    typeRejectedError: `Unsupported filetype`,
    spreadsheetInvalidData: `Invalid data`,
    allValidationsPassedMessage: `All validations passed`,
    validationInProgressMessage: `Validation in progress`,
    maxFilesError: `Maximum 1 file uploaded`,
    previewNotAvailableMessage: `Preview unavailable`,
    isDryRunEnabled: false,
    columns: defaultColumns.map(text => {return {
        text,
        required: true,
    };}),
    validationLocalization: {
        emptyFileError: jest.fn((fileName: string) => `${fileName} is empty`),
        duplicateColumnError: jest.fn((columnName: string) => `Duplicate column ${columnName}`),
        missingColumnError: jest.fn((columnName: string) => `Missing column ${columnName}`),
    },
    exceedsMaxSizeError: jest.fn((fileSize: number, maxSize: number) => `${fileSize} larger than max ${maxSize}`),
    numValidationsFailedMessage: jest.fn((num: number) =>  `${num} validations failed`),
    // All fileUpload handlers must have at least some delay, otherwise we will skip the validation `in-progress` state
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onFileUpload: jest.fn(async (file: File, isDryRun: boolean) => new Promise(resolve => setTimeout(resolve, 50))),
    onFileUploadError: defaultOnFileUploadError,
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const failingFileUpload = jest.fn(async (file: File, isDryRun: boolean) => {
    await new Promise(resolve => setTimeout(resolve, 50));
    throw new CustomError(`Plan to fail`);
});

function toCSV(rows: string[][]) {
    return rows.map((row) => row.join()).join(`\n`);
}

class CustomError extends Error {
    constructor(message: any) {
        super(message);
        this.name = `CustomError`;
    }
}

interface FileStub {
    data?: Blob | string;
    name?: string;
    type?: string;
    size?: number;
    lastModified?: number;
}

const defaultData = [
    [ `Name`, `Email` ],
    [ `Joe Bloggs`, `joe.bloggs@calmid.com` ],
    [ `Adam Smith`, `adam.smith@calmid.com` ],
    [ `Jane Bloggs`, `jane.bloggs@calmid.com` ],
];

const defaultFile: Required<FileStub> = {
    data: toCSV(defaultData),
    name: `test.csv`,
    type: `text/csv`,
    size: 1000,
    lastModified: 1577836800000, // 01/01/2020
};

const render = (overrideProps?: Partial<Props>) => {
    return actualRender(<Base
        {...props}
        {...overrideProps}/>);
};

const hydrateFileStub = (stub?: FileStub) => {
    const fileOpts = {
        ...defaultFile,
        ...stub,
    };
    const fileObj = new File([ fileOpts.data ], fileOpts.name, {
        type: fileOpts.type,
        lastModified: fileOpts.lastModified,
    });
    // Mock `size` property to the desired value
    Object.defineProperty(fileObj, `size`, {
        get() {
            return fileOpts.size;
        },
    });
    return fileObj;
};

const normalizeFileStubs = (fileStub?: FileStub | FileStub[]) => {
    if (!fileStub) return [ {} ];
    return Array.isArray(fileStub) ? fileStub : [ fileStub ];
};

const upload = (container: Document | Element, files?: FileStub | FileStub[]) => {
    const fileStubs = normalizeFileStubs(files);
    const toUpload = fileStubs.map(hydrateFileStub);

    const node = container.querySelector(`input[type='file']`) as HTMLElement;

    if (node === null) {
        throw Error(`File input not found`);
    }

    userEvent.upload(node, toUpload);
};

async function waitForPreview() {
    const { container } = render();

    upload(container);

    const preview = await screen.findByTestId(`preview`);
    expect(preview).toBeInTheDocument();

    await waitForPreviewToParse();
}

function waitForUploadToFinish() {
    const loadingOverlay = document.querySelector(`[data-testid='uploading-overlay'`) as HTMLElement;
    if (loadingOverlay === null) throw new AssertionError({
        message: `Expected upload overlay to be present`,
    });
    // Can't use waitForElementToBeRemoved with queryByRole("progressbar"), as it's always present
    // in the DOM
    // Use similar for testing as MaterialUI Fade
    // https://github.com/mui-org/material-ui/blob/699b5e9ce0dfc8c06fd5f17a0846cd58d03b6414/packages/material-ui/src/Fade/Fade.test.js#L100
    return waitFor(() => expect(loadingOverlay.style.visibility).toBe(`hidden`));
}

function expectEmptyFilepicker () {
    expect(screen.queryByTestId(`validation-details`)).not.toBeInTheDocument();
    expect(screen.queryByTestId(`preview`)).not.toBeInTheDocument();
    expect(screen.queryByTitle(props.uploadButtonTooltip)).not.toBeInTheDocument();
    expect(screen.queryByTitle(props.uploadButtonTooltip)).not.toBeInTheDocument();

    expect(screen.getByText(props.dropzoneLabel)).toBeInTheDocument();
}

function expectPreviewUnavailable() {
    expect(screen.queryByTestId(`validation-details`)).not.toBeInTheDocument();
    expect(screen.queryByTestId(`preview`)).not.toBeInTheDocument();
    expect(screen.getByText(`Preview unavailable`)).toBeInTheDocument();

    expect(uploadButton()).toBeDisabled();
    expect(removeButton()).toBeEnabled();
}

function expectIsUploading() {
    expect(screen.getByTestId(`preview`)).toBeInTheDocument();
    expect(screen.getByTestId(`validation-details`)).toBeInTheDocument();
    expect(screen.getByText(`Validation in progress`)).toBeInTheDocument();
    expect(screen.queryByText(`Invalid data`)).not.toBeInTheDocument();
    expect(screen.queryByText(`All validations passed`)).not.toBeInTheDocument();

    expect(uploadButton()).toBeDisabled();
    expect(removeButton()).toBeDisabled();
}

function expectPreviewErrors() {
    expect(screen.getByText(`Invalid data`)).toBeInTheDocument();
    expect(screen.getByText(`3 validations failed`)).toBeInTheDocument();
    expect(props.numValidationsFailedMessage).toHaveBeenCalled();

    const table = document.querySelector(`table`);
    if (table === null) throw Error(`Expected Preview table`);

    // Both data columns are highlighted red for errors
    expect(Array.from(table.querySelectorAll(`thead th`)).map(hasErrorStyling)).toEqual([
        false,
        true,
        true,
    ]);

    // Row 1 and 2 have error highlighting
    expect(Array.from(table.querySelectorAll(`td:first-child`)).map(hasErrorStyling)).toEqual([
        true,
        true,
        false,
    ]);

    expectHasErrorIcon(table.rows[1].cells[1], `Too short`);

    // Row level error
    expect(Array.from(table.rows[2].cells).every(hasErrorStyling)).toBe(true);
    expectHasErrorIcon(table.rows[2].cells[0], `Row level error`);

    // 100% valid row
    expect(Array.from(table.rows[3].cells).some(hasErrorStyling)).toBe(false);
}

function expectFileUploadCalled({ dryRun, uploadHandler }: {dryRun: boolean; uploadHandler?: Props["onFileUpload"]}) {

    if (typeof uploadHandler === `undefined`) {
        uploadHandler = props.onFileUpload;
    }

    const onUploadMock = (uploadHandler as jest.MockedFunction<Props["onFileUpload"]>).mock;

    expect(uploadHandler).toBeCalledTimes(1);

    const call = onUploadMock.calls[0];
    // Jest mock captures the File object, but can't seem to check the content (returns empty string)
    expect((call[0] as FileWithPath).path).toBe(`test.csv`);

    expect(call[1]).toBe(dryRun);
}

function expectUpload() {
    expect(props.onFileUploadError).not.toBeCalled();
    expect(screen.queryByText(`Upload failed`)).not.toBeInTheDocument();
    expect(screen.queryByText(`Invalid data`)).not.toBeInTheDocument();
}

function expectSuccessfulUpload(uploadHandler?: Props["onFileUpload"]) {
    expectUpload();

    expectFileUploadCalled({
        dryRun: false,
        uploadHandler,
    });

    expect(screen.getByText(`Upload succeeded`)).toBeInTheDocument();
    expect(screen.getByTestId(`upload-success-icon`)).toBeInTheDocument();
}

function expectSuccessfulDryRun(uploadHandler?: Props["onFileUpload"]) {
    expectUpload();

    expectFileUploadCalled({
        dryRun: true,
        uploadHandler,
    });

    expect(screen.queryByText(`Upload succeeded`)).not.toBeInTheDocument();
    expect(screen.queryByTestId(`upload-success-icon`)).not.toBeInTheDocument();
}

interface FailedUploadOptions {
    dryRun: boolean;
    uploadHandler?: jest.MockedFunction<Props["onFileUpload"]>;
    errorHandler?: jest.MockedFunction<Required<Props>["onFileUploadError"]>;
}

function expectFailedUpload({
    dryRun, uploadHandler = failingFileUpload, errorHandler = defaultOnFileUploadError,
}: FailedUploadOptions) {
    const call = uploadHandler.mock.calls[uploadHandler.mock.calls.length - 1];
    // Jest mock captures the File object, but can't seem to check the content (returns empty string)
    expect((call[0] as FileWithPath).path).toBe(`test.csv`);
    expect(call[1]).toBe(dryRun);

    expect(errorHandler).toBeCalledWith(
        expect.objectContaining({
            name: `CustomError`,
            message: `Plan to fail`,
        }),
        dryRun,
    );

    expect(screen.queryByText(`Upload succeeded`)).not.toBeInTheDocument();
    expect(screen.queryByTestId(`upload-success-icon`)).not.toBeInTheDocument();
}

function expectValidationPassed(data?: string[][]) {
    const validationDetails = screen.getByTestId(`validation-details`);
    expect(validationDetails).toBeInTheDocument();

    expect(uploadButton()).toBeEnabled();
    expect(removeButton()).toBeEnabled();

    expect(screen.getByText(`All validations passed`)).toBeInTheDocument();
    expect(screen.getByText(`test.csv`)).toBeInTheDocument();
    expect(screen.getByText(`1.0 Kb • January 1, 2020`)).toBeInTheDocument();

    expectPreviewData(data || defaultData);
}

function expectValidationFailed() {
    expect(screen.getByTestId(`validation-details`)).toBeInTheDocument();
    expect(screen.getByTestId(`preview`)).toBeInTheDocument();

    expect(removeButton()).toBeEnabled();

    expectPreviewErrors();
}

const resetOnFileUploadMock = () => (props.onFileUpload as jest.MockedFunction<Props["onFileUpload"]>).mockClear();

const removeButton = () => {
    const container = screen.queryByTitle(props.removeButtonTooltip);
    if (container === null) return null;
    return container.querySelector(`button`);
};

const uploadButton = () => {
    const container = screen.queryByTitle(props.uploadButtonTooltip);
    if (container === null) return null;
    return container.querySelector(`button`);
};

test(`shows an empty filepicker when initialised`, () => {
    render();

    expectEmptyFilepicker();
});

test(`shows a preview of the selected file`, async() => {
    await waitForPreview();

    expectValidationPassed();
});

test(`displays blank lines in the preview`, async() => {
    const { container } = render();

    const data = [
        defaultColumns,
        [ `` ],
        [ `a`, `b` ],
        [ `` ],
        [ `c`, `d` ],
    ];

    upload(container, {
        data: toCSV(data),
    });

    const preview = await screen.findByTestId(`preview`);
    expect(preview).toBeInTheDocument();

    await waitForPreviewToParse();

    expect(document.querySelectorAll(`tbody tr`)).toHaveLength(4);

    expectPreviewData(data);
});

each([ false, true ]).describe(`file fails validation (isDryRunEnabled = %s)`, (isDryRunEnabled) => {
    test(`when the file is bigger than 'maxFileSize'`, async() => {
        const { container } = render({
            isDryRunEnabled,
        });

        const fileSize = 3000;

        upload(container, {
            size: fileSize,
        });

        await screen.findByTitle(props.removeButtonTooltip);

        expectPreviewUnavailable();

        expect(props.exceedsMaxSizeError).toHaveBeenCalledWith(fileSize, props.maxFileSize);

        expect(screen.getByText(`test.csv`)).toBeInTheDocument();

        expect(props.onFileUpload).not.toBeCalled();
    });

    test(`when an unsupported filetype has been dropped`, async () => {
        const { container } = render({
            isDryRunEnabled,
        });

        upload(container, {
            data: gif,
            name: `cat.gif`,
            type: `image/gif`,
        });

        await screen.findByTitle(props.removeButtonTooltip);

        expectPreviewUnavailable();

        expect(screen.getByText(`Unsupported filetype`)).toBeInTheDocument();

        expect(screen.getByText(`cat.gif`)).toBeInTheDocument();

        expect(props.onFileUpload).not.toBeCalled();
    });

    test(`when more than 'maxFiles' files have been dropped`, async() => {
        const { container } = render();

        upload(container, [
            {
                name: `test1.csv`,
            },
            {
                name: `test2.csv`,
            },
        ]);

        await screen.findByTitle(props.removeButtonTooltip);

        expectPreviewUnavailable();

        expect(screen.getByText(`Maximum 1 file uploaded`)).toBeInTheDocument();

        // Filename of the second file (i.e. last element in `acceptedFiles` array) is shown
        expect(screen.getByText(`test2.csv`)).toBeInTheDocument();

        expect(props.onFileUpload).not.toBeCalled();
    });

    each([ ``, defaultColumns.join() ]).test(`when the file contains %s`, async(data) => {
        const { container } = render();

        upload(container, {
            data,
        });

        // Preview component will be rendered (contains the parsing logic)
        // Before being removed when parsing is complete (and file validation can take place)

        await screen.findByTestId(`preview`);

        await waitForElementToBeRemoved(screen.getByTestId(`preview`));

        expectPreviewUnavailable();

        expect(props.validationLocalization.emptyFileError).toBeCalledWith(`test.csv`);

        expect(screen.getByText(`test.csv is empty`)).toBeInTheDocument();

        expect(props.onFileUpload).not.toBeCalled();
    });

    test(`when required columns are missing`, async() => {
        const { container } = render();

        const data = [
            [ `Name` ],
            [ `Joe Bloggs` ],
            [ `Jane Bloggs` ],
        ];

        upload(container, {
            data: toCSV(data),
        });

        const preview = await screen.findByTestId(`preview`);
        expect(preview).toBeInTheDocument();

        await waitForPreviewToParse();

        expect(screen.getByText(`Invalid data`)).toBeInTheDocument();
        expect(screen.getByText(`1 validations failed`)).toBeInTheDocument();
        expect(screen.getByText(`Missing column Email`)).toBeInTheDocument();
        expect(props.validationLocalization.missingColumnError).toHaveBeenCalledTimes(1);

        const table = document.querySelector(`table`);
        if (table === null) throw new AssertionError({
            message: `Preview table not found`,
        });
        expectHasErrorIcon(table.rows[0].cells[0], `Missing column Email`);

        expect(props.onFileUpload).not.toBeCalled();
    });

    test(`when expected columns are duplicated`, async() => {
        const { container } = render();

        const data = defaultData.map(row => [ ...row, row[row.length - 1] ]);

        upload(container, {
            data: toCSV(data),
        });

        const preview = await screen.findByTestId(`preview`);
        expect(preview).toBeInTheDocument();

        await waitForPreviewToParse();

        expect(screen.getByText(`Invalid data`)).toBeInTheDocument();
        expect(screen.getByText(`1 validations failed`)).toBeInTheDocument();
        expect(screen.getByText(`Duplicate column Email`)).toBeInTheDocument();
        expect(props.validationLocalization.duplicateColumnError).toHaveBeenCalledTimes(1);

        expect(props.onFileUpload).not.toBeCalled();
    });
});

test(`when extra columns are duplicated, validation passes`, async() => {
    const { container } = render();

    const data = [
        [
            `Name`,
            `Email`,
            `Extra`,
            `Extra`,
        ],
        [
            `Joe Bloggs`,
            `joe.bloggs@calmid.com`,
            `Extra-1`,
            `Extra-2`,
        ],
    ];

    upload(container, {
        data: toCSV(data),
    });

    const preview = await screen.findByTestId(`preview`);
    expect(preview).toBeInTheDocument();

    await waitForPreviewToParse();

    expectValidationPassed(data);
});

test(`when optional columns are missing, validation passes`, async() => {
    const { container } = render({
        columns: defaultColumns.map(text => {return {
            text,
            required: true,
        };}).concat([
            {
                text: `Optional`,
                required: false,
            },
        ]),
    });

    upload(container);

    const preview = await screen.findByTestId(`preview`);
    expect(preview).toBeInTheDocument();

    await waitForPreviewToParse();

    expectValidationPassed();
});

test(`reverts to an empty filepicker when delete is clicked`, async() => {
    await waitForPreview();

    const btn = removeButton();
    expect(btn).toBeInTheDocument();

    userEvent.click(btn as HTMLElement);

    expectEmptyFilepicker();
});

test(`on successful upload calls the 'onFileUpload' callback`, async () => {
    await waitForPreview();

    userEvent.click(uploadButton() as HTMLElement);

    await waitForUploadToFinish();

    await waitForPreviewToParse();

    expectSuccessfulUpload();
});

test(`on failed upload calls the 'onFileUploadError' callback and displays errors`, async () => {
    const { container } = render({
        onFileUpload: failingFileUpload,
    });

    upload(container);

    await waitForPreviewToParse();

    userEvent.click(uploadButton() as HTMLElement);

    await waitForUploadToFinish();

    await waitForPreviewToParse();

    expectPreviewData(defaultData);

    expectValidationFailed();

    expectFailedUpload({
        dryRun :false,
    });

    expect(screen.getByText(`Invalid data`)).toBeInTheDocument();

    expect(uploadButton()).not.toBeInTheDocument();
});

test(`if isDryRunEnabled, uploads immediately after loading a valid spreadsheet`, async () => {
    const { container } = render({
        isDryRunEnabled: true,
    });

    upload(container);

    await waitForElementToBeRemoved(screen.getByTestId(`dropzone`));

    await waitForPreviewToParse();

    expectIsUploading();

    await waitForUploadToFinish();

    const preview = await screen.findByTestId(`preview`);
    expect(preview).toBeInTheDocument();

    await waitForPreviewToParse();

    expectSuccessfulDryRun();

});

test(`after a successful dryrun, can be manually uploaded`, async() => {
    const { container } = render({
        isDryRunEnabled: true,
    });

    upload(container);

    await waitForElementToBeRemoved(screen.getByTestId(`dropzone`));

    await waitForPreviewToParse();

    expectIsUploading();

    await waitForUploadToFinish();

    expectSuccessfulDryRun();

    resetOnFileUploadMock();

    userEvent.click(uploadButton() as HTMLElement);

    await waitForUploadToFinish();

    expectSuccessfulUpload();
});

test(`after a failed dryrun, upload is disabled`, async() => {
    const { container } = render({
        isDryRunEnabled: true,
        onFileUpload: failingFileUpload,
    });

    upload(container);

    await waitForElementToBeRemoved(screen.getByTestId(`dropzone`));

    await waitForPreviewToParse();

    expectIsUploading();

    await waitForUploadToFinish();

    expectPreviewData(defaultData);

    expectValidationFailed();

    expectFailedUpload({
        dryRun: true,
    });

    expect(uploadButton()).toBeDisabled();
});

test(`after a successful dryrun, a manual upload can fail`, async() => {
    const succeedThenFailFileUpload = jest.fn()
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .mockImplementationOnce(async (file: File, isDryRun?: boolean) => {
            return new Promise(resolve => setTimeout(resolve, 50));
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        }).mockImplementationOnce(async (file: File, isDryRun?: boolean) => {
            throw new CustomError(`Plan to fail`);
        });

    const { container } = render({
        isDryRunEnabled: true,
        onFileUpload: succeedThenFailFileUpload,
    });

    upload(container);

    await waitForElementToBeRemoved(screen.getByTestId(`dropzone`));

    await waitForPreviewToParse();

    expectIsUploading();

    await waitForUploadToFinish();

    expectSuccessfulDryRun(succeedThenFailFileUpload);

    userEvent.click(uploadButton() as HTMLElement);

    await waitForUploadToFinish();

    await waitForPreviewToParse();

    expectPreviewData(defaultData);

    expectValidationFailed();

    expectFailedUpload({
        dryRun: false,
        uploadHandler: succeedThenFailFileUpload,
    });

    expect(uploadButton()).not.toBeInTheDocument();

});

test(`on failed dryrun and no SpreadsheetValidationErrors are returned from the error handler, the error's message is shown`, async() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const noValidationErrorFileUploadErrorHandler = jest.fn((errors: any, isDryRun: boolean) => []);

    const { container } = render({
        isDryRunEnabled: true,
        onFileUpload: failingFileUpload,
        onFileUploadError: noValidationErrorFileUploadErrorHandler,
    });

    upload(container);

    await waitForElementToBeRemoved(screen.getByTestId(`dropzone`));

    await waitForPreviewToParse();

    expectIsUploading();

    await waitForUploadToFinish();

    expectFailedUpload({
        dryRun: true,
        uploadHandler: failingFileUpload,
        errorHandler: noValidationErrorFileUploadErrorHandler,
    });

    expect(screen.getByText(`Plan to fail`)).toBeInTheDocument();
});
