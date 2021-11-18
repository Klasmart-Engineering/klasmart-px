"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailRegex = void 0;
exports.emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
exports.default = (errorMessage) => (input) => {
    if (input === `` || input === undefined || input === null)
        return true;
    return exports.emailRegex.test(input) || (errorMessage ?? `Invalid email`);
};
