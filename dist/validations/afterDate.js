"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (min, errorMessage) => ((date) => {
    if (!date)
        return true;
    const value = date instanceof Date ? date : new Date(date);
    const time = value.getTime();
    if (isNaN(time)) {
        return errorMessage;
    }
    return time > min.getTime() ? true : errorMessage;
});
