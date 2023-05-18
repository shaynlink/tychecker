# tycheck - a type checker

⚠️ tycheck is still in development, originally created for shortlnk project, it evolve for the moment at the same time as shortlnk.
But its development is to think for a general use and integrable by other projects.

todo adding multiple key target on EntryObject

# Installation guide

```bash
@todo put here installation method
```

# Documentation

## global uses

import on CommonJS
```js
const { stringValidator } = require('tycheck');
```

import on EcmaScript
```js
import { stringValidator } from 'tycheck';
```

simple example
```js
const str = 'Hello World';
const { length } = str;

const validator = stringValidator({
    equLength: length
});

console.log(validator(str)); // true
```

## References

### Functions

### `stringValidator(config)`
**Parameter** config [`StringValidatorConfig`](#)
| key       | type   | required | description   |
|-----------|--------|----------|---------------|
| equLength | Number |  | exact string length   |
| minLength | Number |  | minimum string length |
| maxLength | Number |  | maximum string length |
| regex     | Regex  |  | Applying regex test   |

**Return** [`StringValidatorFn`](#StringValidatorFn)
```js
const str = 'Hello World!';
const validator = stringValidator({ equLength: str.length, regex: /Hello/ });
validator(str);
```

### `objectValidator(config)`
**Parameters** config [`ObjectValidatorConfig`](#ObjectValidatorConfig)
| key              | type    | required | description    |
|------------------|---------|----------|----------------|
| allowEmptyObject | Boolean |  | allow empty object     |
| minLength        | Number  |  | minimum keys count     |
| maxLength        | Number  |  | maximum keys count     |
| equLength        | Number  |  | exact keys count       |
| entries          | [`EntryObjectInstance`](#EntryObjectInstance)[] \| [`EntryObjectValidatorConfig`](#EntryObjectValidatorConfig) |  | Target one key of object for testing data type |

**Return** [`ObjectValidatorFn`](#ObjectValidatorFn)
```js
const obj = { name: 'bob', age: 24 };
const validator = objectValidator({
    allowEmptyObject: true,
    equKeys: Object.keys(obj).length,
    entries: [entryObjectValidator({
            key: 'name',
            required: true
        })]
});
const result = validator(obj);
```

### `entryObjectValidator(config)`
**Parameter** config [`EntryObjectValidatorConfig`](#EntryObjectValidatorConfig)
| key              | type                          | required | description                  |
|------------------|-------------------------------|----------|------------------------------|
| key              | String \| Number \| Symbol    | yes      | Target one key of object     |
| required         | Boolean                                  |  | If key is required on object |
| dataType         | [`DataType`](#DataType) \| [`DataType`](#DataType)[]    | | Check target value type           |
| validator        | [`ValidatorFn`](#ValidatorFn)            |  | Apply Validator function     |
| validators       | [`ValidatorFn`](#EntryObjectInstance)[]  |  | Apply each Validator function, process pass when once Validator return true |
**Return** [`EntryObjectInstance`](#EntryObjectInstance)
```js
const obj = { name: 'bob', age: 24 }
const entryObjectValidatorFn = entryObjectValidator({
    key: 'name',
    required: true,
    dataType: 'string',
});
const validator = objectValidator({
    entries: [entryObjectValidatorFn]
});
const result = validator(obj);
```

## Types

### `DataType`
**Type** [String] - `string` | `number` | `array` | `object` | `bigint`| `function`| `symbol`| `undefined` | `date`| `null`| `boolean`

### `StringValidatorFn`
**Type** [Function] - `(str: string) => boolean`

### `ObjectValidatorFn`
**Type** [Function] - `(obj: any) => boolean`

### `EntryObjectInstanceValidatorFn`
**Type** [Function] - `(obj: any) => boolean`

### `ValidatorFn`
**Type** [Function] - [`StringValidatorFn`](#StringValidatorConfig) | [`ObjectValidatorConfig`](#ObjectValidatorConfig)

### `ObjectValidatorConfig`
**Type** [Object]
| properties       | type    | required | description    |
|------------------|---------|----------|----------------|
| allowEmptyObject | Boolean |  | allow empty object     |
| minLength        | Number  |  | minimum keys count     |
| maxLength        | Number  |  | maximum keys count     |
| equLength        | Number  |  | exact keys count       |
| entries          | [`EntryObjectInstance`](#EntryObjectInstance)[] \| [`EntryObjectValidatorConfig`](#EntryObjectValidatorConfig) |  | Target one key of object for testing data type |

### `EntryObjectValidatorConfig`
**Type** [Object]
| property         | type                          | required | description                  |
|------------------|-------------------------------|----------|------------------------------|
| key              | String \| Number \| Symbol    | yes      | Target one key of object     |
| required         | Boolean                                  |  | If key is required on object |
| dataType         | [`DataType`](#DataType) \| [`DataType`](#DataType)[]    | | Check target value type           |
| validator        | [`ValidatorFn`](#ValidatorFn)            |  | Apply Validator function     |
| validators       | [`ValidatorFn`](#EntryObjectInstance)[]  |  | Apply each Validator function, process pass when once Validator return true |

### `EntryObjectInstance`
**type** [Object]
| property    | type     | required | readonly |description |
|-------------|----------|----------|----------|------------|
| _tyInstance | Boolean  | yes | yes | Object created by `entryObjectValidator` function |
| validator   | Function | yes | yes | Apply Validator function on target value          |

### `StringValidatorConfig`
**type** [Object]

| property         | type    | required | descriptio                 |
|------------------|---------|----------|----------------------------|
| equLength        | Number  |  | Equal string length                |
| minLength        | Number  |  | Minimum string length              |
| maxLength        | Number  |  | Maximum string length              |
| regex            | Regex   |  | Apply Regex test method on string  |