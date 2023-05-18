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
                var result = typeof data === type;
                if (result) return true;
                break;
            case 'array':
                var result = Array.isArray(data);
                if (result) return true;
                break;
            case 'boolean':
                var result = data === true || data === false;
                if (result) return true;
                break;
            case 'date':
                var result = data instanceof Date || new Date(data).toString() != 'Invalid Date';
                if (result) return true;
                break;
            case 'null':
                var result = data === null;
                if (result) return true;
                break;
            case 'object':
                var result = typeof data === 'object' && data.toString() == '[object Object]';
                if (result) return true;
                break;
            default:
                continue;
        }
    }

    return false;
};