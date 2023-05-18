import { regex, stringValidator } from "../src";

describe('Testing all regex', () => {
    it('Email Test', () => {
        const fakeEmails: [string, boolean][] = [
            // email, expected result
            ['example@example.com', true],
            ['example@example€dd./ee', false],
            ['example@example:80.com', false],
            ['example+test@example.dot.com', true],
            ['shaynlink', false],
            ['example&example.com', false]
        ];

        const validator = stringValidator({
            regex: regex.email
        });

        for (const [fakeEmail, expectedResult] of fakeEmails) {
            expect(validator(fakeEmail)).toBe(expectedResult);
        }
    })
});