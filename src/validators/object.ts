import { dataTypeChecker } from "../datatype";
import type {
    ObjectValidatorConfig,
    EntryObjectInstance,
    EntryObjectValidatorConfig,
    ObjectValidatorFn,
    ObjectKeyType,
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
            const keys: ObjectKeyType[] = [];

            if (dataTypeChecker(validatorConfig.key, ['string', 'number', 'symbol'])) {
                keys.push(validatorConfig.key as ObjectKeyType);
            } else if (dataTypeChecker(validatorConfig.key, 'array')) {
                keys.push(...validatorConfig.key as ObjectKeyType[])
            } else if (dataTypeChecker(validatorConfig.key, 'regex')) {
                keys.push(...Object.keys(obj).filter((key) => (validatorConfig.key as RegExp).test(key)));
            } else {
                return false;
            }

            return keys.some((key) => {
                if (validatorConfig?.required) {
                    if (!(key in obj)) {
                        return false;
                    }
                }
    
                // Return true, if key not exist on object
                // because is not required.
                if (!(key in obj)) {
                    return true;
                }
    
                if ('dataType' in validatorConfig) {
                    if (Array.isArray(validatorConfig.dataType)) {
                        const result = validatorConfig.dataType.some((dataType) => dataTypeChecker(obj[key], dataType));
                        if (!result) return false;
                    } else {
                        const result = dataTypeChecker(obj[key], validatorConfig.dataType);
                        if (!result) return false;
                    }
                }
    
                if ('validator' in validatorConfig) {
                    const result = validatorConfig.validator(obj[key]);
                    if (!result) return false;
                }
    
                if ('validators' in validatorConfig) {
                    const result = validatorConfig.validators.some((fnValidator) => fnValidator(obj[key]));
                    if (!result) return false;
                }
    
                return true;
            });
        }
    }
}