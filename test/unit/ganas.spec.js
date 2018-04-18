import { cleanString } from '../../src/utils';
import { expect } from 'chai';
import { getGanas } from '../../src/ganas';
import { getMatras } from '../../src/matras';
import { getSliceDetails } from '../../src/slice-details';
import { makeSchemeTree } from '../../src/scheme-tree';
import { testStrings } from './test-strings';
import { vTokenize } from 'vtokenize';
import vTranslitDevaScheme from 'vtranslit-deva-scheme';

const {
  schemeTree,
  maxTokenLength
} = makeSchemeTree(vTranslitDevaScheme);

const getTokens = str =>

  vTokenize(
    cleanString(str),
    maxTokenLength,
    getSliceDetails(schemeTree)
  );

describe('getGanas', () => {

  testStrings.forEach(testString => {

    it(`should return ganas for '${testString.string}' as '${testString.ganas}'`, () => {

      expect(getGanas(getMatras(getTokens(testString.string)))).to.deep.equal(testString.ganas);

    });

  });

});
