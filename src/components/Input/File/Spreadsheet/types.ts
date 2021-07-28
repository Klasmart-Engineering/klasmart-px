export interface Column {
    text: string;
    required?: boolean;
}

export interface SpreadsheetValidationError {
    row?: number;
    column?: string;
    message: string;
}
