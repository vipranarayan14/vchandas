import { getGanas, makeGanasKey } from './ganas';
import { cleanString } from './utils';
import { getChandas } from './chandas';
import { getMatras } from './matras';
import { getSliceDetails } from './slice-details';
import { getSyllables } from './syllables';
import { makeSchemeTree } from './scheme-tree';
import { prepareChandasList } from './init';
import { vTokenize } from 'vtokenize';
import vTranslitItrnScheme from 'vtranslit-itrn-scheme';

export const vChandas = () => {

  const chandasList = prepareChandasList();

  const {
    schemeTree,
    maxTokenLength
  } = makeSchemeTree(vTranslitItrnScheme);

  return (str, ignoreLastLaghu = false) => {

    const tokens = vTokenize(
      cleanString(str),
      maxTokenLength,
      getSliceDetails(schemeTree)
    );

    const syllables = getSyllables(tokens);

    const matras = getMatras(tokens, ignoreLastLaghu);

    const ganas = getGanas(matras);

    const ganasKey = makeGanasKey(ganas);

    const chandas = getChandas(ganasKey, chandasList);

    return {
      chandas,
      ganas,
      ganasKey,
      matras,
      syllables
    };

  };

};
