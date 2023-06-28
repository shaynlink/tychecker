export type DataType = 'string' | 'number' | 'array' | 'object' | 'bigint' | 'function' | 'symbol' | 'undefined' | 'date' | 'null' | 'boolean' | 'regex' | 'map' | 'set' | 'weakmap';

export interface PipelineObject {
    pass: boolean;
    test: string;
    config: any;
    origin: any;
    key?: string;
}

export type StringValidatorFn = (str: string) => boolean;
export type ObjectValidatorFn = (obj: any) => PipelineObject[] | boolean;
export type EntryObjectInstanceValidatorFn = (object: any) => PipelineObject[];
export type NumberValidatorFn = (num: string | number | bigint) => boolean;
export type DateValidatorFn = (date: string | number | Date) => boolean;
export type ArrayValidatorFn = (arr: any[]) => boolean;
export type EntryArrayInstanceValidatorFn = (entry: any) => boolean;
export type InsertStateFn = (pass: boolean, test: string, config: any, origin: any, key?: ObjectKeyType) => PipelineObject[];

export interface ObjectValidatorConfig {
    usePipelineReturn?: boolean;
    entries?: EntryObjectInstance[] | EntryObjectValidatorConfig[];
    maxKeys?: number;
    minKeys?: number;
    equKeys?: number;
    allowEmptyObject?: boolean;
}

export type ObjectKeyType = string | number | symbol;

export interface EntryObjectValidatorConfig {
    key: ObjectKeyType | ObjectKeyType[] | RegExp;
    errorMessage?: string;
    required?: boolean;
    dataType?: DataType | DataType[];
    validators?: (EntryObjectInstanceValidatorFn | ((entry: any, usePipelineReturn?: boolean) => boolean) | ObjectValidatorFn)[];
}

export interface EntryObjectInstance {
    readonly validator: EntryObjectInstanceValidatorFn;
    readonly _tyInstance: true;
}

export interface StringValidatorConfig {
    equLength?: number;
    minLength?: number;
    maxLength?: number;
    regex?: RegExp;
}

export interface NumberValidatorConfig {
    equAt?: number | bigint;
    minAt?: number | bigint;
    maxAt?: number | bigint;
    transformStringTo?: 'number' | 'bigint';
    allowBigInt?: boolean;
    mustBeBigInt?: boolean;
    allowFloat?: boolean;
    allowInfinite?: boolean;
    allowNoSafeInteger?: boolean;
    allowNegatifAmout?: boolean;
}

export interface DateValidatorConfig {
    transformToDate?: boolean;
    equAt?: Date | number;
    minAt?: Date | number;
    maxAt?: Date | number;
}

export interface ArrayValidatorConfig {
    allowEmpty?: boolean;
    maxItems?: number;
    minItems?: number;
    equItems?: number;
    entries?: EntryArrayInstance[] | EntryArrayValidatorConfig[];
}

export interface EntryArrayValidatorConfig {
    dataType?: DataType | DataType[];
    validator?: EntryArrayInstanceValidatorFn;
    validators?: (EntryArrayInstanceValidatorFn | ((item: any) => boolean))[];
}

export interface EntryArrayInstance {
    readonly validator: EntryArrayInstanceValidatorFn;
    readonly _tyInstance: true;
}