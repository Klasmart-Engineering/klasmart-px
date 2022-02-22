/* eslint-disable testing-library/no-node-access */
/* eslint-disable jest/no-export */
/* eslint-disable jest/no-mocks-import */

import {
    mockData,
    mockFile,
    mockOnParseFile,
    previewColumnIndex,
    validationErrors,
} from "./__mocks__/Preview";
import Preview,
{ Props } from "./Preview";
import {
    render as actualRender,
    screen,
    waitFor,
} from "@testing-library/react";
import React from "react";

const render = ({ errors }: {errors: Props["errors"]} = {
    errors: [],
}) => actualRender((
    <Preview
        file={mockFile}
        errors={errors}
        onParseFile={mockOnParseFile}
    />
));

const getTable = () => screen.getByRole(`table`) as HTMLTableElement;

const rowNumbers = (length: number) => Array.from({
    length: length - 1,
// eslint-disable-next-line @typescript-eslint/naming-convention
}, (_, i) => (i+1).toString());

export function expectPreviewData (spreadsheetData: string[][]) {
    const preview = screen.getByTestId(`preview`);

    expect(preview.querySelector(`table`)?.rows).toHaveLength(spreadsheetData.length);

    // Row indexes
    expect(Array.from(preview.querySelectorAll(`td:first-child`)).map(node => node.textContent)).toEqual(rowNumbers(spreadsheetData.length));

    const data = Array.from(preview.querySelectorAll(`tr`)).map(row =>
        // Ignore first column
        [ ...row.cells ].filter((cell, i) => i !== 0).map(cell => cell.textContent));

    expect(data).toEqual(spreadsheetData);
}

export const hasErrorStyling = (el: Element) => {
    return Array.from(el.classList).some(cls => cls.startsWith(`makeStyles-error`));
};

const expectHasErrorStyling = (el: Element) => expect(hasErrorStyling(el)).toBe(true);

export function expectHasErrorIcon (el: Element, errorMessage: string) {
    expectHasErrorStyling(el);
    const errorIcon = el.querySelector(`svg`);
    if (errorIcon === null) throw Error(`Expected error icon`);
    // SVGElement doesn't define a `title` property, but it can be accessed from it's attributes instead
    expect(errorIcon.attributes.getNamedItem(`title`)?.value).toBe(errorMessage);
}

function expectHasNoErrorIcon (el: Element) {
    expect(el.querySelector(`svg`)).not.toBeInTheDocument();
}

export const waitForPreviewToParse = () => {
    return waitFor(() => {
        expect(document.querySelectorAll(`tbody tr`).length).toBeGreaterThan(0);
    });
};

test(`displays the result of onParseFile when no errors`, async () => {
    render();

    await waitForPreviewToParse();

    expectPreviewData(mockData);
});

test(`displays general errors in the top left corner cell`, async () => {
    render({
        errors: [ validationErrors.general ],
    });

    await waitForPreviewToParse();

    expectHasErrorIcon(getTable().rows[0].cells[0], validationErrors.general.message);
});

test(`displays column errors in column header`, async () => {
    render({
        errors: [ validationErrors.column ],
    });

    await waitForPreviewToParse();

    expectHasErrorIcon(getTable().rows[0].cells[previewColumnIndex(validationErrors.column.column)], validationErrors.column.message);
});

test(`displays row errors in the row number and highlights the row red`, async () => {
    render({
        errors: [ validationErrors.row ],
    });

    await waitForPreviewToParse();

    const errorRow = getTable().rows[validationErrors.row.row];

    expectHasErrorIcon(errorRow.cells[0], validationErrors.row.message);

    expect(Array.from(errorRow.cells).every(hasErrorStyling)).toBe(true);
});

test(`displays field errors in the row/column co-ordinate and highlights the row/column cells red`, async () => {
    render({
        errors: [ validationErrors.field ],
    });

    await waitForPreviewToParse();

    const columnIndex = previewColumnIndex(validationErrors.field.column);

    const table = getTable();

    expectHasErrorIcon(table.rows[validationErrors.field.row].cells[columnIndex], validationErrors.field.message);

    const columnHeader = table.rows[0].cells[columnIndex];
    const rowNumber = table.rows[validationErrors.field.row].cells[0];

    [ columnHeader, rowNumber ].forEach(cell => {
        expectHasErrorStyling(cell);
        expectHasNoErrorIcon(cell);
    });

});
