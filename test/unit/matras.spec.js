import { cleanString, removeSpaces } from '../../src/utils';
import { expect } from 'chai';
import { getMatras } from '../../src/matras';
import { getSliceDetails } from '../../src/slice-details';
import { makeSchemeTree } from '../../src/scheme-tree';
import { testStrings } from './test-strings';
import { vTokenize } from 'vtokenize';
import vTranslitItrnScheme from 'vtranslit-itrn-scheme';

const {
  schemeTree,
  maxTokenLength
} = makeSchemeTree(vTranslitItrnScheme);

const getTokens = str =>

  vTokenize(
    cleanString(str),
    maxTokenLength,
    getSliceDetails(schemeTree)
  );

describe('getMatras', () => {

  testStrings.forEach(testString => {

    it(`should return matras for '${testString.string}' as '[${testString.matras.join(',')}]'`, () => {

      expect(
        getMatras(
          removeSpaces(
            getTokens(testString.string)
          )
        )
      ).to.deep.equal(testString.matras);

    });

  });

});
