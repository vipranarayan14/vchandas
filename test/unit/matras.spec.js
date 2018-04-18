import { cleanString } from '../../src/utils';
import { expect } from 'chai';
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

describe('getMatras', () => {

  testStrings.forEach(testString => {

    it(`should return matras for '${testString.string}' as '[${testString.matras.join(',')}]'`, () => {

      expect(getMatras(getTokens(testString.string))).to.deep.equal(testString.matras);

    });

  });

});
