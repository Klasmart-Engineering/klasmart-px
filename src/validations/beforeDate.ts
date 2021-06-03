export default (max: Date, errorMessage: string) => ((date: Date | string | undefined) => {
    if (!date) return true;

    const value = date instanceof Date ? date : new Date(date);
    const time = value.getTime();

    if (isNaN(time)) {
        return errorMessage;
    }

    return time < max.getTime() ? true : errorMessage;
});
