import assert from "assert";

export const mockFile: File = new File([ `` ], `mockFile.csv`);

export const mockData = [
    [
        `City`,
        `Country`,
        `Population`,
        `Is Capital`,
    ],
    [
        `Tokyo`,
        `Japan`,
        `37977000`,
        `Yes`,
    ],
    [
        `Seoul`,
        `South Korea`,
        `21794000`,
        `Yes`,
    ],
    [
        `Barcelona`,
        `Spain`,
        `4588000`,
        `No`,
    ],
    [
        `London`,
        `England`,
        `10979000`,
        `Yes`,
    ],
];

const mockDataColumns = new Map(mockData[0].map((value, i) => [ value, i ]));

export function previewColumnIndex (name: string) {
    const index = mockDataColumns.get(name);
    assert(index !== undefined);
    // NB: +1 to account for top left corner cell (offsets data columns by one)
    return index + 1;
}

export const mockOnParseFile = (file: File) => {
    return Promise.resolve(mockData);
};

export const validationErrors = {
    general: {
        message: `General error`,
    },
    column: {
        column: `City`,
        message: `Column error`,
    },
    row: {
        row: 2,
        message: `Row error`,
    },
    field: {
        row: 3,
        column: `Population`,
        message: `Field error`,
    },
};
