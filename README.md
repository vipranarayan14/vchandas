# vchandas

An utility for samskrita prosody.

Currently supports only varnasamavrittas.

This package is a library and is useful only for developers.

However, users can avail vchandas' [cli](https://vipranarayan14.github.io/vchandas-cli/) or [web app](https://vipranarayan14.github.io/vchandas-web/).

## Installation

```bash
npm install vchandas
```

## Usage

```js
const { vChandas } = require('vchandas'); // In Nodejs
//            OR
const vChandas = window.vChandas; // In Browser

// Initialization
const vc = vChandas();

// Find chandas
const chandasResult = vc('<string in ITRANS scheme>');

console.log(chandasResult);
```
