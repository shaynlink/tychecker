import { dataTypeChecker } from '../datatype';
import type { NumberValidatorConfig, NumberValidatorFn } from '../types';

export function numberValidator(validatorConfig: NumberValidatorConfig): NumberValidatorFn {
    return (num: string | number | bigint) => {
        if ('transformStringTo' in validatorConfig) {
            if (validatorConfig.transformStringTo === 'number' && typeof num === 'string') {
                num = Number(num) as number;
            } else if (validatorConfig.transformStringTo === 'bigint' && typeof num === 'string') {
                num = BigInt(parseInt(num)) as bigint;
            }
        }

        const validType = dataTypeChecker(num, 'number') || dataTypeChecker(num, 'bigint');
        if (!validType) return false;

        num = num as number | bigint;
        
        const isBigInt = typeof num === 'bigint';

        if (!isBigInt && isNaN(num as number)) {
            return false;
        }

        if ('equAt' in validatorConfig) {
            if (num !== validatorConfig.equAt) {
                return false;
            }
        }

        if ('minAt' in validatorConfig) {
            if (num < validatorConfig.minAt) {
                return false;
            }
        }

        if ('maxAt' in validatorConfig) {
            if (num > validatorConfig.maxAt) {
                return false;
            }
        }

        if ('allowBigInt' in validatorConfig) {
            if (!validatorConfig.allowBigInt && isBigInt) {
                return false;
            }
        }

        if ('mustBeBigInt' in validatorConfig) {
            if (validatorConfig.mustBeBigInt && !isBigInt) {
                return false;
            }
        }

        if ('allowFloat' in validatorConfig && !isBigInt) {
            if (!validatorConfig.allowFloat && !Number.isInteger(num)) {
                return false;
            }
        }

        if ('allowInfinite' in validatorConfig && !isBigInt) {
            if (!validatorConfig.allowInfinite && !Number.isFinite(num)) {
                return false;
            }
        }

        if ('allowNoSafeInteger' in validatorConfig && !isBigInt) {
            if (!validatorConfig.allowNoSafeInteger && !Number.isSafeInteger(num)) {
                return false;
            }
        }

        if ('allowNegatifAmount' in validatorConfig && !validatorConfig.allowNegatifAmount) {
            if (Number.NEGATIVE_INFINITY === num) {
                return false;
            }
            if (0 < num) {
                return false;
            }
        }

        return true;
    };
}