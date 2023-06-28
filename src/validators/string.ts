import { dataTypeChecker } from '../datatype';
import type { StringValidatorConfig, StringValidatorFn } from '../types';
import { newRefRegex } from '../utils';

export function stringValidator(validatorConfig: StringValidatorConfig): StringValidatorFn {
    
    return (str: string) => {
        const validType = dataTypeChecker(str, 'string');
        if (!validType) return false;

        if ('equLength' in validatorConfig) {
            if (str.length !== validatorConfig.equLength) {
                return false;
            }
        }

        if ('minLength' in validatorConfig) {
            if (str.length < validatorConfig.minLength) {
                return false;
            }
        }

        if ('maxLength' in validatorConfig) {
            if (str.length > validatorConfig.maxLength) {
                return false;
            }
        }

        if ('regex' in validatorConfig) {
            if (!newRefRegex(validatorConfig.regex).test(str)) {
                return false;
            }
        }

        return  true;
    };
}