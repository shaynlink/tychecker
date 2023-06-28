export class Dictionary extends Map<string, string> {    
    constructor() {
        super([
            ['allowEmptyObject', 'empty object'],
            ['maxKeys', 'number object keys exceeded'],
            ['minKeys', 'number object keys lower'],
            ['equKeys', 'numer object keys not  reached'],
            ['required', 'key required'],
            ['dataType', 'wrong type'],
            ['validators', 'at least one validators has refused']
        ])
    }

    clone() {
        return new Map([...this.entries()]);
    }
}