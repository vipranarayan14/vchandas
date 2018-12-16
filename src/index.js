import { cleanString, removeSpaces } from './utils';
import { getGanas, makeGanasKey } from './ganas';
import { getChandas } from './chandas';
import { getMatras } from './matras';
import { getSliceDetails } from './slice-details';
import { getSyllables } from './syllables';
import { makeSchemeTree } from './scheme-tree';
import { prepareChandasList } from './prepare-chandas-list';
import { vTokenize } from 'vtokenize';
import { vTranslitSchemeItrn } from 'vtranslit-scheme-itrn';

let $chandasList, $schemeTree, $maxTokenLength;

export class Vchandas {
  constructor() {
    $chandasList = prepareChandasList();

    const { schemeTree, maxTokenLength } = makeSchemeTree(vTranslitSchemeItrn);

    $schemeTree = schemeTree;
    $maxTokenLength = maxTokenLength;

    this.options = {
      ignoreLastLaghu: false
    };
  }

  configure(options) {
    this.options = Object.assign({}, this.options, options);
  }

  find(str) {
    const tokens = vTokenize(
      cleanString(str),
      $maxTokenLength,
      getSliceDetails($schemeTree)
    );

    const cleanedTokens = removeSpaces(tokens);

    const syllables = getSyllables(cleanedTokens);

    const matras = getMatras(cleanedTokens, this.options.ignoreLastLaghu);

    const ganas = getGanas(matras);

    const ganasKey = makeGanasKey(ganas);

    const chandas = getChandas(ganasKey, $chandasList);

    return {
      chandas,
      ganas,
      ganasKey,
      matras: matras.join(','),
      syllables: syllables.join(',')
    };
  }
}
