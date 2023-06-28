import type { DataType } from "./types";

function sourceToString(data: any): string {
    return Object.prototype.toString.call(data);
}

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
                return typeof data === 'object' && sourceToString(data) === '[object Object]';
            case 'regex':
                return typeof data === 'object' && sourceToString(data) === '[object RegExp]';
            case 'map':
                return typeof data === 'object' && sourceToString(data) === '[object Map]';
            case 'set':
                return typeof data === 'object' && sourceToString(data) === '[object Set]';
            case 'weakmap':
                return typeof data === 'object' && sourceToString(data) === '[object WeakMap]';
            default:
                return typeof data === 'object' && sourceToString(data) === type;
        }
    }

    return false;
};