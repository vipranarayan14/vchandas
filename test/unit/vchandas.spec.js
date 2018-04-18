import { expect } from 'chai';

import { testStrings } from './test-strings';
import { vChandas } from '../../src/index';

const vc = vChandas();

describe('vChandas', () => {

  testStrings.forEach(testString => {

    it(`should return chandas for '${testString.string}' as ${testString.chandas}`, () => {

      const chandas = vc(testString.string).chandas;

      if (chandas) {

        expect(chandas.name).to.equal(testString.chandas);

      } else {

        expect(chandas).to.equal(testString.chandas);

      }

    });

  });

});
