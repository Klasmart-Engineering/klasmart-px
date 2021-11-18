"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const email_1 = require("./email");
const phone_1 = require("./phone");
exports.default = (emailErrorMessage, phoneErrorMessage) => (input) => {
    if (input === `` || input === undefined || input === null)
        return true;
    if (input.startsWith(`+`)) {
        if (!phone_1.phoneRegex.test(input)) {
            return phoneErrorMessage ?? emailErrorMessage ?? `Invalid phone`;
        }
    }
    else {
        if (!email_1.emailRegex.test(input)) {
            return emailErrorMessage ?? `Invalid email`;
        }
    }
    return true;
};
