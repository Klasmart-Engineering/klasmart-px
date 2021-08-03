export declare const mockFile: File;
export declare const mockData: string[][];
export declare function previewColumnIndex(name: string): number;
export declare const mockOnParseFile: (file: File) => Promise<string[][]>;
export declare const validationErrors: {
    general: {
        message: string;
    };
    column: {
        column: string;
        message: string;
    };
    row: {
        row: number;
        message: string;
    };
    field: {
        row: number;
        column: string;
        message: string;
    };
};
