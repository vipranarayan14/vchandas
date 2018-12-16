# vchandas

An utility for samskrita prosody.

Currently supports only varnasamavrittas.

This package is a library and is useful only for developers.

However, users can avail vchandas' [cli](https://vipranarayan14.github.io/vchandas-cli/)
or [web app](https://vipranarayan14.github.io/vchandas-web/).

## Installation

```bash
npm install vchandas
```

## Usage

```js
const { Vchandas } = require('vchandas'); // In Nodejs
//            OR
const Vchandas = window.vChandas; // In Browser

// Initialize
const vchandas = new Vchandas();

// Configure
const options = {
  ignoreLastLaghu: true //default: false
};

vchandas.configure(options);

// Find chandas
const chandasResult = vchandas.find('hE raama'); //string in ITRANS scheme

console.log(chandasResult);
```

Output:

```js
{
  chandas: {
    caesura: '',
    definition: 'mO nArI',
    examples: ['nArINAM kalyANI | mAM pAyAtsA vANI ||'],
    ganas: 'ma',
    name: 'nArI',
    type: 'madhyA'
  },
  ganas: {
    ganas: 'ma',
    looseMatras: ''
  },
  ganasKey: 'ma',
  matras: 'ga,ga,ga',
  syllables: 'hE,raa,ma'
};
```
