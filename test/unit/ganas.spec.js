import { getGanas, makeGanasKey } from '../../src/ganas';
import { cleanString } from '../../src/utils';
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

describe('getGanas', () => {

  testStrings.forEach(testString => {

    it(`should return ganas for '${testString.string}' as '${testString.ganas}'`, () => {

      expect(
        makeGanasKey(
          getGanas(
            getMatras(
              getTokens(testString.string)
            )
          )
        )
      ).to.equal(testString.ganasKey);

    });

  });

});
