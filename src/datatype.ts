import type { DataType } from "./type";

export function dataTypeChecker(data: any, types: DataType | DataType[]): boolean {
    let potentialTypes = [];

    if (Array.isArray(types)) potentialTypes = types;
    else potentialTypes = [types];

    
    for (const type of potentialTypes) {
        switch (type) {
            case 'string':
            case 'bigint':
            case 'function':
            case 'symbol':
            case 'number':
            case 'undefined':
                return typeof data === type;
            case 'array':
                return Array.isArray(data);
            case 'boolean':
                return data === true || data === false;
            case 'date':
                return data instanceof Date || new Date(data).toString() !== 'Invalid Date';
            case 'null':
                return data === null;
            case 'object':
                return typeof data === 'object' && data.toString() === '[object Object]';
            case 'regex':
                return typeof data === 'object' && Object.prototype.toString.call(data) === '[object RegExp]';
            default:
                continue;
        }
    }

    return false;
};