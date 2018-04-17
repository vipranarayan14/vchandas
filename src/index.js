import { devanagariScheme } from 'vtranslit-schemes';
import { getChandas } from './chandas';
import { getGanas } from './ganas';
import { getMatras } from './matras';
import { getSliceDetails } from './slice-details';
import { getSyllables } from './syllables';
import { makeSchemeTree } from './scheme-tree';
import { prepareChandasList } from './init';
import { vTokenize } from 'vtokenize';

export const vChandas = () => {

  const chandasList = prepareChandasList();

  const {
    schemeTree,
    maxTokenLength
  } = makeSchemeTree(devanagariScheme);

  return (inStr, ignoreLastLaghu = false) => {

    const tokens = vTokenize(
      inStr,
      maxTokenLength,
      getSliceDetails(schemeTree)
    );

    const syllables = getSyllables(tokens);

    const matras = getMatras(tokens, ignoreLastLaghu);

    const ganas = getGanas(matras);

    const chandas = getChandas(ganas, chandasList);

    return {
      chandas,
      ganas,
      matras,
      syllables
    };

  };

};
