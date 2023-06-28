import {
    stringValidator,
    objectValidator,
    entryObjectValidator
} from '../src';
import { arrayValidator, entryArrayValidator } from '../src/validators/array';
import { dateValidator } from '../src/validators/date';
import { numberValidator } from '../src/validators/number';

describe('String validator', () => {
    const str = 'Hello world!';

    it('Equal Length Pass', () => {
        const validator = stringValidator({
            equLength: str.length
        });

        expect(validator(str)).toBeTruthy();
    });

    it('Equal Length Fail', () => {
        const validator = stringValidator({
            equLength: str.length + 1
        });

        expect(validator(str)).toBeFalsy();
    });

    it('Minimum Length Pass', () => {
        const validator = stringValidator({
            minLength: str.length
        });

        expect(validator(str)).toBeTruthy();
    });

    it('Minimum Length Fail', () => {
        const validator = stringValidator({
            minLength: str.length + 1
        });

        expect(validator(str)).toBeFalsy();
    });

    it('Maximum Length Pass', () => {
        const validator = stringValidator({
            maxLength: str.length
        });

        expect(validator(str)).toBeTruthy();
    });

    it('Maximum Length Fail', () => {
        const validator = stringValidator({
            maxLength: str.length - 1
        });

        expect(validator(str)).toBeFalsy();
    });

    it('Regex Pass', () => {
        const validator = stringValidator({
            regex: /hello/i
        });

        expect(validator(str)).toBeTruthy();
    });

    it('Regex Fail', () => {
        const validator = stringValidator({
            regex: /hello/
        });
        
        expect(validator(str)).toBeFalsy();
    })
})

interface TestObject {
    name: string;
    age: number;
    country: string;
}

describe('Object validator', () => {
    const obj: TestObject = {
        name: 'bob',
        age: 24,
        country: 'France'
    };

    it('Allow Empty Object Pass', () => {
        const validator = objectValidator({
            allowEmptyObject: true
        });

        expect(validator({})).toBeTruthy();
    });

    it('Allow Empty Object Fail', () => {
        const validator = objectValidator({
            allowEmptyObject: false
        });

        expect(validator({})).toBeFalsy();
    });

    it('Maximum Keys Pass', () => {
        const validator = objectValidator({
            maxKeys: Object.keys(obj).length
        });

        expect(validator(obj)).toBeTruthy();
    });

    it('Maximum Keys Fail', () => {
        const validator = objectValidator({
            maxKeys: Object.keys(obj).length - 1
        })

        expect(validator(obj)).toBeFalsy();
    });

    it('Minimum Keys Pass', () => {
        const validator = objectValidator({
            minKeys: Object.keys(obj).length
        });

        expect(validator(obj)).toBeTruthy();
    });

    it('Minimum Keys Fail', () => {
        const validator = objectValidator({
            minKeys: Object.keys(obj).length + 1
        })

        expect(validator(obj)).toBeFalsy();
    });

    it('Equal Keys Pass', () => {
        const validator = objectValidator({
            equKeys: Object.keys(obj).length
        });

        expect(validator(obj)).toBeTruthy();
    });

    it('Equal Keys Fail', () => {
        const validator = objectValidator({
            equKeys: Object.keys(obj).length + 1
        })

        expect(validator(obj)).toBeFalsy();
    });
});

describe('Entries of Object validator', () => {
    const obj: TestObject = {
        name: 'bob',
        age: 24,
        country: 'France'
    };

    it('Required Pass', () => {
        const validator = objectValidator({
            entries: [
                entryObjectValidator({
                    key: 'name',
                    required: true
                })
            ]
        });

        expect(validator(obj)).toBeTruthy();
    });

    it('Required Fail', () => {
        const validator = objectValidator({
            entries: [
                entryObjectValidator({
                    key: 'username',
                    required: true
                })
            ]
        })

        expect(validator(obj)).toBeFalsy();
    });

    it('Data Type Pass', () => {
        const validator = objectValidator({
            entries: [
                entryObjectValidator({
                    key: 'name',
                    dataType: 'string'
                })
            ]
        });

        expect(validator(obj)).toBeTruthy()
    });

    it('Data Type Fail', () => {
        const validator = objectValidator({
            entries: [
                entryObjectValidator({
                    key: 'name',
                    dataType: 'number',
                })
            ]
        });
        
        expect(validator(obj)).toBeFalsy();
    });
})

describe('number validator', () => {
    const num = 10;

    it('Transform String To Number', () => {
        const validator = numberValidator({
            transformStringTo: 'number'
        });

        expect(validator('1')).toBeTruthy();
    });

    it('Transform String To Big Int', () => {
        const validator = numberValidator({
            transformStringTo: 'bigint'
        });

        expect(validator('1n')).toBeTruthy();
    });

    it('Integer Equal At Pass', () => {
        const validator = numberValidator({
            equAt: num
        });

        expect(validator(num)).toBeTruthy();
    });

    it('Integer Equal At Fail', () => {
        const validator = numberValidator({
            equAt: num + 1
        });

        expect(validator(num)).toBeFalsy();
    });

    it('Big Int Equal At Pass', () => {
        const validator = numberValidator({
            equAt: BigInt(10)
        });

        expect(validator(BigInt(10))).toBeTruthy();
    });

    it('Big Int Equal At Fail', () => {
        const validator = numberValidator({
            equAt: BigInt(10)
        });

        expect(validator(BigInt(11))).toBeFalsy();
    });

    it('Integer Minimum At Pass', () => {
        const validator = numberValidator({
            minAt: num
        });

        expect(validator(num)).toBeTruthy();
    });

    it('Integer Minimum At Fail', () => {
        const validator = numberValidator({
            minAt: num + 1
        });

        expect(validator(num)).toBeFalsy();
    });

    it('Big Int Minimum At Pass', () => {
        const validator = numberValidator({
            minAt: BigInt(10)
        });

        expect(validator(BigInt(10))).toBeTruthy();
    });

    it('Big Int Minimum At Fail', () => {
        const validator = numberValidator({
            minAt: BigInt(10)
        });

        expect(validator(BigInt(9))).toBeFalsy();
    });

    it('Maximum At Pass', () => {
        const validator = numberValidator({
            maxAt: BigInt(10)
        });

        expect(validator(BigInt(10))).toBeTruthy();
    });

    it('Maximum At Fail', () => {
        const validator = numberValidator({
            maxAt: BigInt(9)
        });

        expect(validator(BigInt(10))).toBeFalsy();
    });

    it('Allow Float Pass', () => {
        const validator = numberValidator({
            allowFloat: true
        });

        expect(validator(1.2)).toBeTruthy();
    });

    it('Allow Float Fail', () => {
        const validator = numberValidator({
            allowFloat: false
        });
        
        expect(validator(1.2)).toBeFalsy();
    });

    it('Allow Infinite Pass', () => {
        const validator = numberValidator({
            allowInfinite: true
        });

        expect(validator(Number.POSITIVE_INFINITY)).toBeTruthy();
        expect(validator(Number.NEGATIVE_INFINITY)).toBeTruthy();
    });

    it('Allow Infinite Fail', () => {
        const validator = numberValidator({
            allowInfinite: false
        });
        
        expect(validator(Number.POSITIVE_INFINITY)).toBeFalsy();
        expect(validator(Number.NEGATIVE_INFINITY)).toBeFalsy();
    });

    it('Allow Safe Integer Pass', () => {
        const validator = numberValidator({
            allowNoSafeInteger: true
        });

        expect(validator(Number.MAX_SAFE_INTEGER + 1)).toBeTruthy();
        expect(validator(Number.MIN_SAFE_INTEGER - 1)).toBeTruthy();
    });

    it('Allow Safe Integer Fail', () => {
        const validator = numberValidator({
            allowNoSafeInteger: false
        });
        
        expect(validator(Number.MAX_SAFE_INTEGER + 1)).toBeFalsy();
        expect(validator(Number.MIN_SAFE_INTEGER - 1)).toBeFalsy();
    });


})

describe('Date validator', () => {
    const date = new Date('May 23, 2023, 12:30:30');

    it('Equal At Date Pass', () => {
        const validator = dateValidator({
            equAt: date
        });

        expect(validator(date)).toBeTruthy();
    });

    it('Equal At Date Fail', () => {
        const validator = dateValidator({
            equAt: new Date('May 24, 2023, 12:30:30')
        });

        expect(validator(date)).toBeFalsy();
    });

    it('Equal At Number Pass', () => {
        const validator = dateValidator({
            equAt: date.getTime()
        });

        expect(validator(date)).toBeTruthy();
    });

    it('Equal At Number Fail', () => {
        const validator = dateValidator({
            equAt: new Date('May 24, 2023, 12:30:30').getTime()
        });

        expect(validator(date)).toBeFalsy();
    });

    it('Minimum At Date Pass', () => {
        const validator = dateValidator({
            minAt: date
        });

        expect(validator(date)).toBeTruthy();
    });

    it('Minimum At Date Fail', () => {
        const validator = dateValidator({
            minAt: new Date('May 24, 2023, 12:30:30')
        });

        expect(validator(date)).toBeFalsy();
    });

    it('Minimum At Number Pass', () => {
        const validator = dateValidator({
            minAt: date.getTime()
        });

        expect(validator(date)).toBeTruthy();
    });

    it('Minimum At Number Fail', () => {
        const validator = dateValidator({
            minAt: new Date('May 24, 2023, 12:30:30').getTime()
        });

        expect(validator(date)).toBeFalsy();
    });

    it('Maximum At Date Pass', () => {
        const validator = dateValidator({
            maxAt: date
        });

        expect(validator(date)).toBeTruthy();
    });

    it('Maximum At Date Fail', () => {
        const validator = dateValidator({
            maxAt: new Date('May 22, 2023, 12:30:30')
        });

        expect(validator(date)).toBeFalsy();
    });

    it('Maximum At Number Pass', () => {
        const validator = dateValidator({
            maxAt: date.getTime()
        });

        expect(validator(date)).toBeTruthy();
    });

    it('Maximum At Number Fail', () => {
        const validator = dateValidator({
            maxAt: new Date('May 22, 2023, 12:30:30').getTime()
        });

        expect(validator(date)).toBeFalsy();
    });
})

describe('Array validator', () => {
    const arr: string[] = ['foo', 'bar']

    it('Allow Empty Array Pass', () => {
        const validator = arrayValidator({
            allowEmpty: true
        });

        expect(validator([])).toBeTruthy();
    });

    it('Allow Empty Array Fail', () => {
        const validator = arrayValidator({
            allowEmpty: false
        });

        expect(validator([])).toBeFalsy();
    });

    it('Maximum Items Pass', () => {
        const validator = arrayValidator({
            maxItems: arr.length
        });

        expect(validator(arr)).toBeTruthy();
    });

    it('Maximum Items Fail', () => {
        const validator = arrayValidator({
            maxItems: arr.length - 1
        })

        expect(validator(arr)).toBeFalsy();
    });

    it('Minimum Items Pass', () => {
        const validator = arrayValidator({
            minItems: arr.length
        });

        expect(validator(arr)).toBeTruthy();
    });

    it('Minimum Items Fail', () => {
        const validator = arrayValidator({
            minItems: arr.length + 1
        })

        expect(validator(arr)).toBeFalsy();
    });

    it('Equal Items Pass', () => {
        const validator = arrayValidator({
            equItems: arr.length
        });

        expect(validator(arr)).toBeTruthy();
    });

    it('Equal Items Fail', () => {
        const validator = arrayValidator({
            equItems: arr.length + 1
        })

        expect(validator(arr)).toBeFalsy();
    });
});

describe('Entries of Array validator', () => {
    const arr: string[] = ['foo', 'bar'];

    it('Data Type Pass', () => {
        const validator = arrayValidator({
            entries: [
                entryArrayValidator({
                    dataType: 'string'
                })
            ]
        });

        expect(validator(arr)).toBeTruthy()
    });

    it('Data Type Fail', () => {
        const validator = arrayValidator({
            entries: [
                entryArrayValidator({
                    dataType: 'number',
                })
            ]
        });
        
        expect(validator(arr)).toBeFalsy();
    });

    it('Validator Pass', () => {
        const validator = arrayValidator({
            entries: [
                entryArrayValidator({
                    validator: stringValidator({
                        regex: /foo|bar/gi,
                    })
                })
            ]
        })

        expect(validator(arr)).toBeTruthy();
    });

    it('Validator Fail', () => {
        const validator = arrayValidator({
            entries: [
                entryArrayValidator({
                    validator: stringValidator({
                        regex: /random/gi,
                    })
                })
            ]
        })

        expect(validator(arr)).toBeFalsy();
    });
})