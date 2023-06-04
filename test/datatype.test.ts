import { dataTypeChecker } from "../src/datatype"

describe('data type checker', () => {
    it('String type', () => {
        expect(dataTypeChecker('Hello', 'string')).toBeTruthy();
        expect(dataTypeChecker(5, 'string')).toBeFalsy();
    });

    it('Bit Int type', () => {
        expect(dataTypeChecker(BigInt(1), 'bigint')).toBeTruthy();
        expect(dataTypeChecker('Hello', 'bigint')).toBeFalsy();
    });

    it('Function type', () => {
        expect(dataTypeChecker(() => void 0, 'function')).toBeTruthy();
        expect(dataTypeChecker('Hello', 'function')).toBeFalsy();
    });

    it('Symbol type', () => {
        expect(dataTypeChecker(Symbol('Hello'), 'symbol')).toBeTruthy();
        expect(dataTypeChecker('Hello', 'symbol')).toBeFalsy();
    });

    it('Number type', () => {
        expect(dataTypeChecker(5, 'number')).toBeTruthy();
        expect(dataTypeChecker('Hello', 'number')).toBeFalsy();
    });

    it('Undefined type', () => {
        expect(dataTypeChecker(undefined, 'undefined')).toBeTruthy();
        expect(dataTypeChecker('Hello', 'undefined')).toBeFalsy();
    });

    it('Array type', () => {
        expect(dataTypeChecker(['Hello'], 'array')).toBeTruthy();
        expect(dataTypeChecker('Hello', 'array')).toBeFalsy();
    });

    it('Boolean type', () => {
        expect(dataTypeChecker(true, 'boolean')).toBeTruthy();
        expect(dataTypeChecker('Hello', 'boolean')).toBeFalsy();
    });
    
    it('Date type', () => {
        expect(dataTypeChecker(new Date('2023-06-04T01:37:51.160Z'), 'date')).toBeTruthy();
        expect(dataTypeChecker('2023-06-04T01:37:51.160Z', 'date')).toBeTruthy();
        expect(dataTypeChecker('Hello', 'date')).toBeFalsy();
    });

    it('Null type', () => {
        expect(dataTypeChecker(null, 'null')).toBeTruthy();
        expect(dataTypeChecker('Hello', 'null')).toBeFalsy();
    });

    it('Object type', () => {
        expect(dataTypeChecker({ foo: 'bar' }, 'object')).toBeTruthy();
        expect(dataTypeChecker('Hello', 'object')).toBeFalsy();
    });

    it('Regex type', () => {
        expect(dataTypeChecker(/a/g, 'regex')).toBeTruthy();
        expect(dataTypeChecker('Hello', 'regex')).toBeFalsy();
    });
})