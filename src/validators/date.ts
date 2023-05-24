import { dataTypeChecker } from "../datatype";
import type { DateValidatorConfig, DateValidatorFn } from "../type";

export function dateValidator(validatorConfig: DateValidatorConfig): DateValidatorFn {
    return (date: string | number | Date) => {
        if (!(date instanceof Date)) {
            date = new Date(date);
        }

        date = date as Date;

        const validType = dataTypeChecker(date, 'date');
        if (!validType) return false;

        if ('equAt' in validatorConfig) {
            if (validatorConfig.equAt instanceof Date) {
                if (date.getTime() !== validatorConfig.equAt.getTime()) {
                    return false;
                }
            } else if (typeof validatorConfig.equAt === 'number') {
                if (date.getTime() !== validatorConfig.equAt) {
                    return false;
                }
            }
        }

        if ('minAt' in validatorConfig) {
            if (validatorConfig.minAt instanceof Date) {
                if (date.getTime() < validatorConfig.minAt.getTime()) {
                    return false;
                }
            } else if (typeof validatorConfig.minAt === 'number') {
                if (date.getTime() < validatorConfig.minAt) {
                    return false;
                }
            }
        }

        if ('maxAt' in validatorConfig) {
            if (validatorConfig.maxAt instanceof Date) {
                if (date.getTime() > validatorConfig.maxAt.getTime()) {
                    return false;
                }
            } else if (typeof validatorConfig.maxAt === 'number') {
                if (date.getTime() > validatorConfig.maxAt) {
                    return false;
                }
            }
        }


        return true;
    }
}