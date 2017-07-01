# random-hexadecimal

> Return a random hexadecimal number.

[![MIT License](https://img.shields.io/badge/license-MIT_License-green.svg?style=flat-square)](https://github.com/mock-end/random-hexadecimal/blob/master/LICENSE)

[![build:?](https://img.shields.io/travis/mock-end/random-hexadecimal/master.svg?style=flat-square)](https://travis-ci.org/mock-end/random-hexadecimal)
[![coverage:?](https://img.shields.io/coveralls/mock-end/random-hexadecimal/master.svg?style=flat-square)](https://coveralls.io/github/mock-end/random-hexadecimal)


## Install

```
$ npm install --save random-hexadecimal
```

## Usage

> For more use-cases see the [tests](https://github.com/mock-end/random-hexadecimal/blob/master/test/spec/index.js)


```js
var randomHex = require('random-hexadecimal');

// API
// - randomHex([options]);

// options
// - min
// - max
```

By default it will return an hexadecimal number between `0` and `9007199254740992`:

```js
randomHex();
// => '0xaf91'
```

Can optionally provide `min` and `max`:

```js
randomHex({ max: 15 });
// => '0od'

randomHex({ min: 7, max: 15});
// => '0o7ab9'
```

**Note**: these `min` and `max` are **inclusive**, so they are included in the range.


## Related

- [random-integral](https://github.com/mock-end/random-integral) - Return a random integer.
- [random-natural](https://github.com/mock-end/random-natural) - Return a random natural number.
- [random-decimal](https://github.com/mock-end/random-decimal) - Return a random decimal.
- [random-floating](https://github.com/mock-end/random-floating) - Return a random floating point number.
- [random-index](https://github.com/mock-end/random-index) - Return a random array-like index.
- [random-binary](https://github.com/mock-end/random-binary) - Return a random binary number.
- [random-octal](https://github.com/mock-end/random-octal) - Return a random octal number.
- [random-unicode](https://github.com/mock-end/random-unicode) - Return a random unicode. 
- [random-bool](https://github.com/mock-end/random-bool) - Return a random boolean (true/false).
- [random-char](https://github.com/mock-end/random-char) - Return a random char.


## Contributing

Pull requests and stars are highly welcome.

For bugs and feature requests, please [create an issue](https://github.com/mock-end/random-hexadecimal/issues/new).
