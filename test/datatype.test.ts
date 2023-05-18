import {
    stringValidator,
    objectValidator,
    entryObjectValidator
} from '../src';

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

        expect(validator(obj)).toBeTruthy();
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