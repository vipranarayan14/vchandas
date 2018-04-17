import { expect } from 'chai';

import { testStrings } from './test-strings';
import { vChandas } from '../../src/index';

const vc = vChandas();

describe('vChandas', () => {

  testStrings.forEach(testString => {

    it(`should return chandas for '${testString.string}' as ${testString.chandas}`, () => {

      expect(vc(testString.string).chandas.name).to.equal(testString.chandas);

    });

  });

});
