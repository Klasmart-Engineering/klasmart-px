import { sleep } from "../../../../utils";
import SpreadsheetFileInput,
{ Props } from "./Base";
import { SpreadsheetValidationError } from "./types";
import { Story } from "@storybook/react";
import React from "react";

export default {
    title: `Spreadsheet/Base`,
    component: SpreadsheetFileInput,
};

const handleFileUpload = async (file: File) => {
    console.log(`start`, file.name);
    await sleep(2000);
    console.log(`stop`, file.name);
    const error: ServerError = {
        data: [],
        errors: [
            {
                code: `ERR_CSV_MISSING_REQUIRED`,
                details: {
                    row: 1,
                    column: `organization_name_123`,
                    message: `organization name is required.`,
                },
            },
            {
                code: `ERR_CSV_MISSING_REQUIRED_FIELD`,
                details: {
                    row: 1,
                    column: `organization_name_123`,
                    message: `organization name is a required field.`,
                },
            },
            {
                code: `ERR_CSV_DUPLICATE_ENTITY`,
                details: {
                    row: 4,
                    column: `organization_name`,
                    message: `"{name}" organization already exists.`,
                },
            },
            {
                code: `ERR_CSV_INVALID_EMAIL`,
                details: {
                    row: 5,
                    column: `user_email`,
                    message: `user email must be a valid email address.`,
                },
            },
            {
                code: `ERR_CSV_INVALID_ALPHA`,
                details: {
                    row: 200,
                    column: `user_family_name`,
                    message: `user family_name must only contain letters.`,
                },
            },
            {
                code: `ERR_CSV_MISSING_REQUIRED_COLUMN`,
                details: {
                    message: `Missing user_phone column`,
                },
            },
        ],
    };
    throw error;
};

interface ServerError {
    data: any;
    errors: {
        code: ErrorCode;
        details: {
            message: string;
            entity?: string;
            attribute?: string;
            row?: number;
            column?: string;
        };
    }[];
}

type ErrorCode =
    | `ERR_CSV_AT_ROW`
    | `ERR_CSV_EMPTY_FILE`
    | `ERR_CSV_EMPTY_FILE`
    | `ERR_CSV_BAD_FORMAT`
    | `ERR_CSV_MISSING_REQUIRED_FIELD`
    | `ERR_CSV_MISSING_REQUIRED`
    | `ERR_CSV_MISSING_REQUIRED_EITHER`
    | `ERR_CSV_DUPLICATE_ENTITY`
    | `ERR_CSV_DUPLICATE_ENTITY`
    | `ERR_CSV_DUPLICATE_CHILD_ENTITY`
    | `ERR_CSV_NONE_EXISTING_ENTITY`
    | `ERR_CSV_NONE_EXIST_ENTITY`
    | `ERR_CSV_NONE_EXIST_CHILD_ENTITY`
    | `ERR_CSV_INVALID_FIELD`
    | `ERR_CSV_INVALID_ENUM`
    | `ERR_CSV_INVALID_MIN`
    | `ERR_CSV_INVALID_MAX`
    | `ERR_CSV_INVALID_BETWEEN`
    | `ERR_CSV_INVALID_ALPHA`
    | `ERR_CSV_INVALID_ALPHA_NUM`
    | `ERR_CSV_INVALID_DATE_FORMAT`
    | `ERR_CSV_INVALID_BOOLEAN`
    | `ERR_CSV_INVALID_EMAIL`
    | `ERR_CSV_INVALID_NUMBER`
    | `ERR_CSV_INVALID_UUID`
    | `ERR_CSV_INVALID_GREATER_THAN_OTHER`
    | `ERR_CSV_INVALID_DIFFERENT`
    | `ERR_CSV_INVALID_UPPERCASE_ALPHA_NUM_WITH_MAX`
    | `ERR_CSV_INVALID_MULTIPLE_EXIST`
    | `ERR_CSV_INVALID_MULTIPLE_EXIST_CHILD`
    | `ERR_CSV_INVALID_LENGTH`
    | `ERR_CSV_MISSING_REQUIRED_COLUMN`;

const handleFileUploadError = (error: ServerError): SpreadsheetValidationError[] => {
    const errors = error.errors;
    return errors.map((error) => ({
        message: error.details.message,
        column: error.details.column,
        row: error.details.row,
    }));
};

const Template: Story<Props> = (args) => (
    <div
        style={{
            height: `100vh`,
        }}
    >
        <SpreadsheetFileInput
            {...args}
            columns={[
                {
                    text: `organization_name`,
                    required: true,
                },
                {
                    text: `user_given_name`,
                    required: true,
                },
                {
                    text: `user_family_name`,
                    required: true,
                },
                {
                    text: `user_shortcode`,
                },
                {
                    text: `user_email`,
                    required: true,
                },
                {
                    text: `user_phone`,
                },
                {
                    text: `user_date_of_birth`,
                },
                {
                    text: `user_gender`,
                    required: true,
                },
                {
                    text: `organization_role_name`,
                    required: true,
                },
                {
                    text: `school_name`,
                },
                {
                    text: `class_name`,
                },
            ]}
            onFileUpload={handleFileUpload}
            onFileUploadError={handleFileUploadError}
        />
    </div>
);

export const Main = Template.bind({});

Main.args = {
    maxFileSize: 500_000,
    accept: `text/csv`,
    isDryRunEnabled: false,
};
