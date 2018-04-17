import { expect } from 'chai';

import { getMatras } from '../../src/matras';
import { getSliceDetails } from '../../src/slice-details';
import { makeSchemeTree } from '../../src/scheme-tree';
import { schemes } from 'vtranslit-schemes';
import { testStrings } from './test-strings';
import { vTokenize } from 'vtokenize';

const devanagariScheme = schemes.Deva;

const {
  schemeTree,
  maxTokenLength
} = makeSchemeTree(devanagariScheme);

const getTokens = inStr =>

  vTokenize(
    inStr,
    maxTokenLength,
    getSliceDetails(schemeTree)
  );

describe.only('getMatras', () => {

  testStrings.forEach(testString => {

    it(`should return matras for '${testString.string}' as '[${testString.matras.join(',')}]'`, () => {

      expect(getMatras(getTokens(testString.string))).to.deep.equal(testString.matras);

    });

  });

});
