export const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default (errorMessage?: string) => (input: any) => {
    if (input === `` || input === undefined || input === null) return true;
    return emailRegex.test(input) || (errorMessage ?? `Invalid email`);
};
