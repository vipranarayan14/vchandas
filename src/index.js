import { cleanString, removeSpaces } from './utils';
import { getGanas, makeGanasKey } from './ganas';
import { getChandas } from './chandas';
import { getMatras } from './matras';
import { getSliceDetails } from './slice-details';
import { getSyllables } from './syllables';
import { makeSchemeTree } from './scheme-tree';
import { prepareChandasList } from './init';
import { vTokenize } from 'vtokenize';
import { vTranslitSchemeItrn } from 'vtranslit-scheme-itrn';

export const vChandas = () => {

  const chandasList = prepareChandasList();

  const {
    schemeTree,
    maxTokenLength
  } = makeSchemeTree(vTranslitSchemeItrn);

  return (str, ignoreLastLaghu = false) => {

    const tokens = vTokenize(
      cleanString(str),
      maxTokenLength,
      getSliceDetails(schemeTree)
    );

    const cleanedTokens = removeSpaces(tokens);

    const syllables = getSyllables(cleanedTokens);

    const matras = getMatras(cleanedTokens, ignoreLastLaghu);

    const ganas = getGanas(matras);

    const ganasKey = makeGanasKey(ganas);

    const chandas = getChandas(ganasKey, chandasList);

    return {
      chandas,
      ganas,
      ganasKey,
      matras: matras.join(','),
      syllables: syllables.join(',')
    };

  };

};
