import { objectValidator, entryObjectValidator, stringValidator } from "../src";

describe('Object Validator Misc Test', () => {
    const obj: {hello: string} = {
        hello: 'world!'
    }
    
    it('Deep Validator Pass', () => {
        const validator = objectValidator({
            entries: [
                entryObjectValidator({
                    key: 'hello',
                    dataType: 'string',
                    validator: stringValidator({
                        equLength: obj.hello.length
                    })
                })
            ]
        });

        expect(validator(obj)).toBeTruthy();
    });

    it('Deep Validator Fail', () => {
        const validator = objectValidator({
            entries: [
                entryObjectValidator({
                    key: 'hello',
                    dataType: 'string',
                    validator: stringValidator({
                        equLength: obj.hello.length + 1
                    }),
                })
            ]
        });

        expect(validator(obj)).toBeFalsy();
    });

    it('Entries Object Settled By Classic Object Pass', () => {
        const validator = objectValidator({
            entries: [
                {
                    key: 'hello',
                    dataType: 'string',
                    required: true,
                    validator: stringValidator({ equLength: obj.hello.length })
                }
            ]
        });

        expect(validator(obj)).toBeTruthy();
    });

    it('Unexist Entry Key Pass', () => {
        const validator = objectValidator({
            entries: [
                {
                    key: 'foo',
                    dataType: 'string',
                }
            ]
        });

        expect(validator(obj)).toBeTruthy();
    });

    const deepObject: { foo: { result: string } } = {
        foo: {
            result: 'bar'
        }
    };

    it('Deeply Multiple Entry Of Object Pass', () => {
        const validator = objectValidator({
            entries: [
                entryObjectValidator({
                    key: 'foo',
                    validator: objectValidator({
                        entries: [
                            entryObjectValidator({
                                key: 'result',
                                validator: stringValidator({
                                    equLength: deepObject.foo.result.length
                                })
                            })
                        ]
                    })
                })
            ]
        });

        expect(validator(deepObject)).toBeTruthy();
    });

    it('Deeply Multiple Entry Of Object Fail', () => {
        const validator = objectValidator({
            entries: [
                entryObjectValidator({
                    key: 'foo',
                    validator: objectValidator({
                        entries: [
                            entryObjectValidator({
                                key: 'result',
                                validator: stringValidator({
                                    equLength: deepObject.foo.result.length + 1
                                })
                            })
                        ]
                    })
                })
            ]
        });

        expect(validator(deepObject)).toBeFalsy();
    });

    const pseudoRandomObject: (i: number) => {foo: string | number} = (i: number) => ({
        foo: ['bar', 1][i]
    });

    it('Multiple DataType Possibility Pass', () => {
        const validator = objectValidator({
            entries: [
                entryObjectValidator({
                    key: 'foo',
                    dataType: ['string', 'number'],
                })
            ]
        });

        expect(validator(pseudoRandomObject(0))).toBeTruthy();
        expect(validator(pseudoRandomObject(1))).toBeTruthy();
    });

    it('Multiple DataType Possibility Fail', () => {
        const validator = objectValidator({
            entries: [
                entryObjectValidator({
                    key: 'foo',
                    dataType: ['array', 'bigint'],
                })
            ]
        });

        expect(validator(pseudoRandomObject(0))).toBeFalsy();
        expect(validator(pseudoRandomObject(1))).toBeFalsy();
    });
});