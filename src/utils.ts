export function newRefRegex(rgx: RegExp): RegExp {
    return new RegExp(rgx.source, rgx.flags);
}

export function parseData(data: any | [any, string]) {
    if (Array.isArray(data)) return [data[0], data[1]];
    else return [data, null];
}
