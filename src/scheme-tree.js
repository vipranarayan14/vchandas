import { getMatra } from './matras';

const makeSchemeLeaf = (akshara, aksharaIndex, schemeBranch, schemeSubset, tokenLengths) => {

  if (akshara) {

    schemeBranch[akshara] = {

      akshara,
      matra: getMatra(schemeSubset, aksharaIndex),
      type: schemeSubset

    };

    tokenLengths.push(akshara.length);

  }

};

const makeSchemeBranch = (scheme, schemeSubset, tokenLengths) => {

  const schemeBranch = {};

  scheme.data[schemeSubset].forEach((akshara, aksharaIndex) => {

    makeSchemeLeaf(
      akshara,
      aksharaIndex,
      schemeBranch,
      schemeSubset,
      tokenLengths
    );

    return;

  });

  return schemeBranch;

};

export const makeSchemeTree = fromScheme => {

  const tokenLengths = [];

  let maxTokenLength = 0;

  const schemeTree = Object.assign({},

    makeSchemeBranch(fromScheme, 'deadConsonants', tokenLengths),
    makeSchemeBranch(fromScheme, 'consonants', tokenLengths),
    makeSchemeBranch(fromScheme, 'vowels', tokenLengths),
    makeSchemeBranch(fromScheme, 'vowelMarks', tokenLengths),
    makeSchemeBranch({
      'data': {
        'ayogavaha': ['\u0902', '\u0903']
      }
    }, 'ayogavaha', tokenLengths)

  );

  maxTokenLength = Math.max(...tokenLengths);

  return {
    maxTokenLength,
    schemeTree
  };

};
