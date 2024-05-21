export const execAll = (regex: RegExp, str: string): string[][] => {
    const matches = [];
    let match;
    while ((match = regex.exec(str)) !== null) {
        matches.push(match);
    }
    return matches;
}