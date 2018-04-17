import { devanagariScheme } from 'vtranslit-schemes';
import { expect } from 'chai';
import { getGanas } from '../../src/ganas';
import { getMatras } from '../../src/matras';
import { getSliceDetails } from '../../src/slice-details';
import { makeSchemeTree } from '../../src/scheme-tree';
import { testStrings } from './test-strings';
import { vTokenize } from 'vtokenize';

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

describe('getGanas', () => {

  testStrings.forEach(testString => {

    it(`should return ganas for '${testString.string}' as '${testString.ganas}'`, () => {

      expect(getGanas(getMatras(getTokens(testString.string)))).to.deep.equal(testString.ganas);

    });

  });

});
