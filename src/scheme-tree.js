const makeSchemeLeaf = (akshara, aksharaIndex, schemeBranch, schemeSubset, tokenLengths) => {

  if (akshara) {

    schemeBranch[akshara] = {

      akshara,
      aksharaIndex,
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

export const makeSchemeTree = scheme => {

  const tokenLengths = [];

  let maxTokenLength = 0;

  const schemeTree = Object.assign({},

    makeSchemeBranch(scheme, 'deadConsonants', tokenLengths),
    makeSchemeBranch(scheme, 'consonants', tokenLengths),
    makeSchemeBranch(scheme, 'vowels', tokenLengths),
    makeSchemeBranch(scheme, 'vowelMarks', tokenLengths),
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
