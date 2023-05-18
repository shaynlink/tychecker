export type DataType = 'string' | 'number' | 'array' | 'object' | 'bigint' | 'function' | 'symbol' | 'undefined' | 'date' | 'null' | 'boolean';

export type StringValidatorFn = (str: string) => boolean;
export type ObjectValidatorFn = (obj: any) => boolean;
export type EntryObjectInstanceValidatorFn = (object: any) => boolean;

export type ValidatorFn = StringValidatorFn | ObjectValidatorConfig;

export interface ObjectValidatorConfig {
    allowEmptyObject?: boolean;
    entries?: EntryObjectInstance[] | EntryObjectValidatorConfig[];
    maxKeys?: number;
    minKeys?: number;
    equKeys?: number;
}

export interface EntryObjectValidatorConfig {
    key: string;
    required?: boolean;
    dataType?: DataType | DataType[];
    validator?: EntryObjectInstanceValidatorFn;
    validators?: EntryObjectInstanceValidatorFn[];
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
