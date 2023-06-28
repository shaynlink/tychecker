import { dataTypeChecker } from '../datatype';
import type {
    ArrayValidatorConfig,
    ArrayValidatorFn,
    EntryArrayValidatorConfig,
    EntryArrayInstance
} from '../types';

export function arrayValidator(validatorConfig: ArrayValidatorConfig): ArrayValidatorFn {
    return (arr: any[]) => {
        const validType = dataTypeChecker(arr, 'array');
        if (!validType) return false;

        if (('allowEmpty' in validatorConfig) && !validatorConfig.allowEmpty) {
            if (arr.length < 1) {
                return false;
            }
        }

        if ('maxItems' in validatorConfig) {
            if (arr.length > validatorConfig.maxItems) {
                return false;
            }
        }

        if ('minItems' in validatorConfig) {
            if (arr.length < validatorConfig.minItems) {
                return false;
            }
        }

        if ('equItems' in validatorConfig) {
            if (arr.length !== validatorConfig.equItems) {
                return false;
            }
        }

        if ('entries' in validatorConfig) {
            const entries: EntryArrayInstance[] = validatorConfig.entries.map((entry) => {
                if (!entry._tyInstance) {
                    return entryArrayValidator(entry);
                }
                return entry;
            });

            for (const entry of entries) {
                const validated = entry.validator(arr);
                if (!validated) return false;
            }
        }

        return true;
    }
}

export function entryArrayValidator(validatorConfig: EntryArrayValidatorConfig): EntryArrayInstance {
    return {
        _tyInstance: true,
        validator(arr: any): boolean {
            return arr.every((entry) => {
                if ('dataType' in validatorConfig) {
                    if (Array.isArray(validatorConfig.dataType)) {
                        const result = validatorConfig.dataType.some((dataType) => dataTypeChecker(entry, dataType));
                        if (!result) return false;
                    } else {
                        const result = dataTypeChecker(entry, validatorConfig.dataType);
                        if (!result) return false;
                    }
                }

                if ('validator' in validatorConfig) {
                    const result = validatorConfig.validator(entry);
                    if (!result) return false;
                }

                if ('validators' in validatorConfig) {
                    const result = validatorConfig.validators.some((fnValidator) => fnValidator(entry));
                    if (!result) return false;
                }

                return true;
            })
        }
    }
}