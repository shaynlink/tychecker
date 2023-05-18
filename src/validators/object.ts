import { dataTypeChecker } from "../datatype";
import type {
    ObjectValidatorConfig,
    EntryObjectInstance,
    EntryObjectValidatorConfig,
    ObjectValidatorFn,
} from "../type";

export function objectValidator(validatorConfig: ObjectValidatorConfig): ObjectValidatorFn {
    return (obj: any) => {
        const validType = dataTypeChecker(obj, 'object');
        if (!validType) return false;

        if (('allowEmptyObject' in validatorConfig) && !validatorConfig.allowEmptyObject) {
            if (Object.keys(obj).length < 1) {
                return false;
            }
        }

        if ('maxKeys' in validatorConfig) {
            if (Object.keys(obj).length > validatorConfig.maxKeys) {
                return false;
            }
        }

        if ('minKeys' in validatorConfig) {
            if (Object.keys(obj).length < validatorConfig.minKeys) {
                return false;
            }
        }

        if ('equKeys' in validatorConfig) {
            if (Object.keys(obj).length !== validatorConfig.equKeys) {
                return false;
            }
        }

        if ('entries' in validatorConfig) {
            const entries: EntryObjectInstance[] = validatorConfig.entries.map((entry) => {
                if (!entry._tyInstance) {
                    return entryObjectValidator(entry);
                }
                return entry
            });

            for (const entry of entries) {
                const validated = entry.validator(obj);
                if (!validated) return false;
            }
        }

        return true;
    };
}

export function entryObjectValidator(validatorConfig: EntryObjectValidatorConfig): EntryObjectInstance {
    return {
        _tyInstance: true,
        validator(obj: any): boolean {
            if (validatorConfig?.required) {
                if (!(validatorConfig.key in obj)) {
                    return false;
                }
            }

            if (!(validatorConfig.key in obj)) {
                return true;
            }

            if ('dataType' in validatorConfig) {
                if (Array.isArray(validatorConfig.dataType)) {
                    const result = validatorConfig.dataType.some((dataType) => dataTypeChecker(obj[validatorConfig.key], dataType));
                    if (!result) return false;
                } else {
                    const result = dataTypeChecker(obj[validatorConfig.key], validatorConfig.dataType);
                    if (!result) return false;
                }
            }

            if ('validator' in validatorConfig) {
                const result = validatorConfig.validator(obj[validatorConfig.key]);
                if (!result) return false;
            }

            if ('validators' in validatorConfig) {
                const result = validatorConfig.validators.some((fnValidator) => fnValidator(obj[validatorConfig.key]));
                if (!result) return false;
            }

            return true;
        }
    }
}