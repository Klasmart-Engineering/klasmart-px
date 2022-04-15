export default (min: Date, errorMessage: string) => ((date: any) => {
    if (!date) return true;

    const value = date instanceof Date ? date : new Date(date);
    const time = value.getTime();

    if (isNaN(time)) {
        return errorMessage;
    }

    return time > min.getTime() ? true : errorMessage;
});
