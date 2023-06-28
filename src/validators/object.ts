import { dataTypeChecker } from '../datatype';
import type {
    EntryObjectInstance,
    EntryObjectValidatorConfig,
    ObjectValidatorFn,
    ObjectKeyType,
    ObjectValidatorConfig,
    PipelineObject,
    InsertStateFn
} from '../types';

const initiateState = (refPipeline: PipelineObject[]): InsertStateFn => (pass: boolean, test: string, config: any, origin: any, key?: string) => {
    refPipeline.push({
        pass,
        test,
        config,
        origin,
        key
    });

    return refPipeline;
}

export function objectValidator(validatorConfig: ObjectValidatorConfig): ObjectValidatorFn {
    const pipeline: PipelineObject[] = [];
    const usePipeline = !!validatorConfig?.usePipelineReturn;

    const sprayInsertState = (pipes: PipelineObject[]) => { for (const pipe of pipes) pipeline.push(pipe) };  
    const insertState = initiateState(pipeline);

    return (obj: any): PipelineObject[] | boolean => {
        const validType = dataTypeChecker(obj, 'object');
        if (!validType) return false;
        if (('allowEmptyObject' in validatorConfig) && !validatorConfig.allowEmptyObject) {
            const verif = Object.keys(obj).length < 1;
            
            if (!usePipeline) {
                if (verif) {
                    return;
                }
            } else insertState(!verif, 'allowEmptyObject', validatorConfig.allowEmptyObject, obj);
        }

        if ('maxKeys' in validatorConfig) {
            const verif = Object.keys(obj).length > validatorConfig.maxKeys;
            if (!usePipeline) {
                if (verif) {
                    return false;
                }
            } else insertState(!verif, 'maxKeys', validatorConfig.maxKeys, obj);
        }

        if ('minKeys' in validatorConfig) {
            const verif = Object.keys(obj).length < validatorConfig.minKeys;
            if (!usePipeline) {
                if (verif) {
                    return false;
                }
            } else insertState(!verif, 'minKeys', validatorConfig.minKeys, obj);
        }

        if ('equKeys' in validatorConfig) {
            const verif = Object.keys(obj).length !== validatorConfig.equKeys;
            if (!usePipeline) {
                if (verif) {
                    return false;
                }
            } else insertState(!verif, 'equKeys', validatorConfig.equKeys, obj);

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
                if (!usePipeline) {
                    if (!validated.every((v) => v.pass)) return false;
                } else {
                    sprayInsertState(validated);
                }
            }
        }

        return usePipeline ? pipeline : true;
    };
}

export function entryObjectValidator(validatorConfig: EntryObjectValidatorConfig): EntryObjectInstance {
    return {
        _tyInstance: true,
        validator(obj: any): PipelineObject[] {
            const keys: ObjectKeyType[] = [];
            const pipeline = [];

            const insertState = initiateState(pipeline);

            if (dataTypeChecker(validatorConfig.key, ['string', 'number', 'symbol'])) {
                keys.push(validatorConfig.key as ObjectKeyType);
            } else if (dataTypeChecker(validatorConfig.key, 'array')) {
                keys.push(...validatorConfig.key as ObjectKeyType[])
            } else if (dataTypeChecker(validatorConfig.key, 'regex')) {
                keys.push(...Object.keys(obj).filter((key) => (validatorConfig.key as RegExp).test(key)));
            } else {
                insertState(false, 'key', validatorConfig.key, Object.keys(obj));
            }

            for (const key of keys) {
                if (('required' in validatorConfig) && !!validatorConfig.required) {    
                    if (!(key in obj)) {
                        insertState(false, 'required', validatorConfig.required, obj, key);
                        continue;
                    }
                }
    
                // Return true, if key not exist on object
                // because is not required.
                if (!(key in obj)) {
                    continue;
                }
    
                if ('dataType' in validatorConfig) {
                    if (Array.isArray(validatorConfig.dataType)) {
                        const result = validatorConfig.dataType.some((dataType) => dataTypeChecker(obj[key], dataType));
                        insertState(result, 'dataType', validatorConfig.dataType, obj, key);
                    } else {
                        const result = dataTypeChecker(obj[key], validatorConfig.dataType);
                        insertState(result, 'dataType', validatorConfig.dataType, obj, key);
                    }
                }
    
                if ('validators' in validatorConfig) {
                    const result = validatorConfig.validators.some((fnValidator) => fnValidator(obj[key], true));
                    insertState(result, 'validators', validatorConfig.validators, obj, key);
                }
            };

            return pipeline;
        }
    }
}