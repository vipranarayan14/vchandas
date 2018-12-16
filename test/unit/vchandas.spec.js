import { Vchandas } from '../../src/index';

import { expect } from 'chai';

import { testStrings } from './test-strings';

const vchandas = new Vchandas();

describe('vChandas', () => {
  testStrings.forEach(testString => {
    it(`should return chandas for '${testString.string}' as ${
      testString.chandas
    }`, () => {
      const { chandas } = vchandas.find(testString.string);

      if (chandas) {
        expect(chandas.name).to.equal(testString.chandas);
      } else {
        expect(chandas).to.equal(testString.chandas);
      }
    });
  });
});
