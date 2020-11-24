export default (name: string, maxLength = Number.MAX_SAFE_INTEGER): string => {
    if (!name) return ``;
    const match = name.match(/[A-Z][a-z]+|[0-9]|[A-Z]|[a-z]+/g);
    if (!match) return name.substring(0, 1).toUpperCase();
    const [
        first,
        second,
        third,
        fourth,
    ] = match;
    let initial = ``;
    if (first) initial += first.substring(0, 1);
    if (second) initial += second.substring(0, 1);
    if (third) initial += third.substring(0, 1);
    if (fourth) initial += fourth.substring(0, 1);
    return initial.toUpperCase().substring(0, maxLength);
};