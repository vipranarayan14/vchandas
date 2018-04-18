import { cleanString } from './utils';
import { getChandas } from './chandas';
import { getGanas } from './ganas';
import { getMatras } from './matras';
import { getSliceDetails } from './slice-details';
import { getSyllables } from './syllables';
import { makeSchemeTree } from './scheme-tree';
import { prepareChandasList } from './init';
import { vTokenize } from 'vtokenize';
import vTranslitDevaScheme from 'vtranslit-deva-scheme';

export const vChandas = () => {

  const chandasList = prepareChandasList();

  const {
    schemeTree,
    maxTokenLength
  } = makeSchemeTree(vTranslitDevaScheme);

  return (str, ignoreLastLaghu = false) => {

    const tokens = vTokenize(
      cleanString(str),
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
