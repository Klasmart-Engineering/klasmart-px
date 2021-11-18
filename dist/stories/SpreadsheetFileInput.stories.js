"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Main = void 0;
const Base_1 = __importDefault(require("../components/Input/File/Spreadsheet/Base"));
const utils_1 = require("../utils");
const react_1 = __importDefault(require("react"));
exports.default = {
    title: `Spreadsheet/Base`,
    component: Base_1.default,
};
const handleFileUpload = async (file) => {
    console.log(`start`, file.name);
    await (0, utils_1.sleep)(2000);
    console.log(`stop`, file.name);
    const error = {
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
const handleFileUploadError = (error) => {
    const errors = error.errors;
    return errors.map((error) => ({
        message: error.details.message,
        column: error.details.column,
        row: error.details.row,
    }));
};
const Template = (args) => (react_1.default.createElement("div", { style: {
        height: `100vh`,
    } },
    react_1.default.createElement(Base_1.default, { ...args, columns: [
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
        ], onFileUpload: handleFileUpload, onFileUploadError: handleFileUploadError })));
exports.Main = Template.bind({});
exports.Main.args = {
    maxFileSize: 500_000,
    accept: `text/csv`,
    isDryRunEnabled: false,
};
