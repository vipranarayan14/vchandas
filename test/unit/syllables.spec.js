import { devanagariScheme } from 'vtranslit-schemes';
import { expect } from 'chai';
import { getSliceDetails } from '../../src/slice-details';
import { getSyllables } from '../../src/syllables';
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

describe('getSyllables', () => {

  testStrings.forEach(testString => {

    it(`should return syllables for '${testString.string}' as ${testString.syllables}`, () => {

      expect(getSyllables(getTokens(testString.string))).to.deep.equal(testString.syllables);

    });

  });

});
