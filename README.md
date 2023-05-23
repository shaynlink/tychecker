# tychecker - a type checker

> ⚠️ tycheck is still in development, originally created for shortlnk project, it
> evolve for the moment at the same time as shortlnk. But its development is to
> think for a general use and integrable by other projects.

# Features

- [x] String Validator Function
- [x] Object Validator Function
  - [x] Object Entry Validator Function
  - [ ] Object Entry Validator for multiple keys
- [x] Number Validator Function
  - [x] Number Validator Function support Big Int
- [ ] Date Validator Function
- [ ] Array Validator Function
  - [ ] Array Entry Validator Function
- [ ] Pipeline System
  - ~~[ ] Middleware Server Handler System~~ 
- [ ] Map Validator Function
- [ ] Set Validator Function
- [ ] Use Error Callack System instead of return Boolean
- [ ] Transform Data into a Valid Data Type expected instead of Boolean

# Installation guide

```bash
npm install tychecker
```

# Documentation

## global uses

import on CommonJS

```js
const { stringValidator } = require("tychecker");
```

import on EcmaScript

```js
import { stringValidator } from "tychecker";
```

simple example

```js
const str = "Hello World";
const { length } = str;

const validator = stringValidator({
  equLength: length,
});

console.log(validator(str)); // true
```

## References

### Functions

### `stringValidator(config)`

**Parameter** config [`StringValidatorConfig`](#StringValidatorConfig)
| Properties | Type   | Required | Description    |
|------------|--------|----------|----------------|
| equLength  | Number |  | exact string length    |
| minLength  | Number |  | minimum string length  |
| maxLength  | Number |  | maximum string length  |
| regex      | Regex  |  | Applying regex test    |

**Return** [`StringValidatorFn`](#StringValidatorFn)

```js
const str = "Hello World!";
const validator = stringValidator({ equLength: str.length, regex: /Hello/ });
validator(str);
```

### `objectValidator(config)`

**Parameters** config [`ObjectValidatorConfig`](#ObjectValidatorConfig)
| Properties       | Type                                                                                                           | Required | Description                            |
|------------------|----------------------------------------------------------------------------------------------------------------|----------|----------------------------------------|
| allowEmptyObject | Boolean                                                                                                        |  | allow empty object                             |
| minLength        | Number                                                                                                         |  | minimum keys count                             |
| maxLength        | Number                                                                                                         |  | maximum keys count                             |
| equLength        | Number                                                                                                         |  | exact keys count                               |
| entries          | [`EntryObjectInstance`](#EntryObjectInstance)[] \| [`EntryObjectValidatorConfig`](#EntryObjectValidatorConfig)[] |  | Target one key of object for testing data type |

**Return** [`ObjectValidatorFn`](#ObjectValidatorFn)

```js
const obj = { name: "bob", age: 24 };
const validator = objectValidator({
  allowEmptyObject: true,
  equKeys: Object.keys(obj).length,
  entries: [entryObjectValidator({
    key: "name",
    required: true,
  })],
});
const result = validator(obj);
```

### `entryObjectValidator(config)`

**Parameter** config [`EntryObjectValidatorConfig`](#EntryObjectValidatorConfig)
| Properties | Type                                                 | Required | Description                                                         |
|------------|------------------------------------------------------|----------|---------------------------------------------------------------------|
| key        | String \| Number \| Symbol                           | yes      | Target one key of object                                            |
| Required   | Boolean                                              |  | If key is required on object                                                |
| dataType   | [`DataType`](#DataType) \| [`DataType`](#DataType)[] |  | Check target value type                                                     |
| validator  | [`ValidatorFn`](#ValidatorFn)                        |  | Apply Validator function                                                    |
| validators | [`ValidatorFn`](#EntryObjectInstance)[]              |  | Apply each Validator function, process pass when once Validator return true |

**Return** [`EntryObjectInstance`](#EntryObjectInstance)

```js
const obj = { name: "bob", age: 24 };
const entryObjectValidatorFn = entryObjectValidator({
  key: "name",
  required: true,
  dataType: "string",
});
const validator = objectValidator({
  entries: [entryObjectValidatorFn],
});
const result = validator(obj);
```

### `dataTypeChecker(data, types)`

**Parameter** data `any`

**Parameter** types [`DataType`](#DataType) | [`DataType`](#DataType)[]

**Return** `Boolean`

```js
const str = "Hello World!";
dataTypeChecker(str, "string");
```

### `numberValidatorFunction(config)`

**Parameter** config [`NumberValidatorConfig`](#NumberValidatorConfig)
| Properties         | Type                 | Required | Description                                                      |
|--------------------|----------------------|----------|------------------------------------------------------------------|
| equAt              | Number \| BigInt     |  | Equal at entry number\|bigint                                            |
| minAt              | Number \| BigInt     |  | Minimum at entry number\|bigint                                          |
| maxAt              | Number \| BigInt     |  | Maximum at entry number\|bigint                                          |
| transformStringTo  | 'number' \| 'bigint' |  | Transform entry string to number or bigint before apply validation tests |
| allowBigInt        | Boolean              |  | Allow BigInt type on entry                                               |
| mustBeBigInt       | Boolean              |  | Entry must be a BigInt                                                   |
| allowFloat         | Boolean              |  | Allow Float on entry                                                     |
| allowInfinite      | Boolean              |  | Allow Infinite on entry                                                  |
| allowNoSafeInteger | Boolean              |  | Allow No Safe Integer on entry                                           |
| allowNegatifAmout  | Boolean              |  | Allow Negatif Amount on entry                                            |

**Return** [`NumberValidatorFn`](#NumberValidatorFn)

## Objects

### `regex`

| Property | Type  |
| -------- | ----- |
| email    | Tegex |

```js
const { stringValidator, regex } = require("tycheck");

stringValidator({
  regex: regex.email,
});
```

## Types

### `DataType`

**Type** [String] - `string` | `number` | `array` | `object` | `bigint`|
`function`| `symbol`| `undefined` | `date`| `null`| `boolean`

### `StringValidatorFn`

**Type** [Function] - `(str: string) => boolean`

### `ObjectValidatorFn`

**Type** [Function] - `(obj: any) => boolean`

### `EntryObjectInstanceValidatorFn`

**Type** [Function] - `(obj: any) => boolean`

### `NumberValidatorFn`

**Type** [Function] - `(num: string | number | bigint) => boolean`

### `ValidatorFn`

**Type** [Function] - [`StringValidatorFn`](#StringValidatorConfig) |
[`ObjectValidatorConfig`](#ObjectValidatorConfig) | [`NumberValidatorFn`](#NumberValidatorFn)

### `ObjectValidatorConfig`

**Type** [Object]
| properties       | Type                                                                                                           | Required | Description                            |
|------------------|----------------------------------------------------------------------------------------------------------------|----------|----------------------------------------|
| allowEmptyObject | Boolean                                                                                                        |  | allow empty object                             |
| minLength        | Number                                                                                                         |  | minimum keys count                             |
| maxLength        | Number                                                                                                         |  | maximum keys count                             |
| equLength        | Number                                                                                                         |  | exact keys count                               |
| entries          | [`EntryObjectInstance`](#EntryObjectInstance)[] \| [`EntryObjectValidatorConfig`](#EntryObjectValidatorConfig) |  | Target one key of object for testing data type |

### `EntryObjectValidatorConfig`

**Type** [Object]
| Property   | Type                                                 | Required | Description                                                         |
|------------|------------------------------------------------------|----------|---------------------------------------------------------------------|
| key        | String \| Number \| Symbol                           | yes      | Target one key of object                                            |
| Required   | Boolean                                              |  | If key is required on object                                                |
| dataType   | [`DataType`](#DataType) \| [`DataType`](#DataType)[] |  | Check target value type                                                     |
| validator  | [`ValidatorFn`](#ValidatorFn)                        |  | Apply Validator function                                                    |
| validators | [`ValidatorFn`](#EntryObjectInstance)[]              |  | Apply each Validator function, process pass when once Validator return true |

### `EntryObjectInstance`

**type** [Object]
| Property    | Type     | Required | readonly | Description                                       |
|-------------|----------|----------|----------|---------------------------------------------------|
| _tyInstance | Boolean  | yes      | yes      | Object created by `entryObjectValidator` function |
| validator   | Function | yes      | yes      | Apply Validator function on target value          |

### `StringValidatorConfig`

**type** [Object]

| Property  | Type   | Required | descriptio                        |
| --------- | ------ | -------- | --------------------------------- |
| equLength | Number |          | Equal string length               |
| minLength | Number |          | Minimum string length             |
| maxLength | Number |          | Maximum string length             |
| regex     | Regex  |          | Apply Regex test method on string |

### `NumberValidatorConfig`

**type** [Object]

| Properties         | Type                 | Required | Description                                                      |
|--------------------|----------------------|----------|------------------------------------------------------------------|
| equAt              | Number \| BigInt     |  | Equal at entry number\|bigint                                            |
| minAt              | Number \| BigInt     |  | Minimum at entry number\|bigint                                          |
| maxAt              | Number \| BigInt     |  | Maximum at entry number\|bigint                                          |
| transformStringTo  | 'number' \| 'bigint' |  | Transform entry string to number or bigint before apply validation tests |
| allowBigInt        | Boolean              |  | Allow BigInt type on entry                                               |
| mustBeBigInt       | Boolean              |  | Entry must be a BigInt                                                   |
| allowFloat         | Boolean              |  | Allow Float on entry                                                     |
| allowInfinite      | Boolean              |  | Allow Infinite on entry                                                  |
| allowNoSafeInteger | Boolean              |  | Allow No Safe Integer on entry                                           |
| allowNegatifAmout  | Boolean              |  | Allow Negatif Amount on entry                                            |

## Example

### Multiple type Object validator

```js
const { objectValidatorn entryObjectValidator } = require('tychecker');

const obj = (i) => ({
    foo: ['bar', 1, {}][i]
});

const validator = objectValidator({
    entries: [
        entryObjectValidator({
            key: 'foo',
            dataType: ['string', 'number']
        })
    ]
})

validator(obj(0)); // true
validator(obj(1)); // true
validator(obj(2)); // false
```

### Deep data type Validator

```js
const { objectValidator, entryObjectValidator, stringValidator } = require("tychecker");

const obj = {
  foo: "bar",
};

const validator = objectValidator({
  entries: [
    entryObjectValidator({
      key: "foo",
      dataType: "string",
      validator: stringValidator({
        minLength: 2,
      }),
    }),
  ],
});

validator(obj); // true
```

### Deep Object Validator

```js
const { objectValidator, entryObjectValidator } = require("tychecker");

const deepObject = {
  result: {
    foo: "bar",
  },
};

const validator = objectValidator({
  entries: [
    entryObjectValidator({
      key: "result",
      validator: objectValidator({
        entries: [
          entryObjectValidator({
            key: "foo",
            equKeys: 1,
          }),
        ],
      }),
    }),
  ],
});

validator(deepObject); // true
```

### Use Object instead of `entryObjectValidator` function

```js
const { objectValidator } = require("tychecker");

const obj = {
  foo: "bar",
};

const validator = objectValidator({
  entries: [{
    key: "foo",
    equKeys: 1,
  }],
});

validator(true);
```

# Credit

- Author - [shaynlink](https://github.com/shaynlink)

© 2023 - MIT
