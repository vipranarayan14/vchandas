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

    if (!Array.isArray(akshara)) {

      makeSchemeLeaf(
        akshara,
        aksharaIndex,
        schemeBranch,
        schemeSubset,
        tokenLengths
      );

      return;

    }

    akshara.forEach(alternateAkshara => {

      makeSchemeLeaf(
        alternateAkshara,
        aksharaIndex,
        schemeBranch,
        schemeSubset,
        tokenLengths
      );

    });

  });

  return schemeBranch;

};

export const makeSchemeTree = scheme => {

  const tokenLengths = [];

  let maxTokenLength = 0;

  const schemeTree = Object.assign({},

    makeSchemeBranch(scheme, 'deadConsonants', tokenLengths),
    makeSchemeBranch(scheme, 'vowels', tokenLengths),
    makeSchemeBranch(scheme, 'symbols', tokenLengths),
    makeSchemeBranch(scheme, 'ayogavaha', tokenLengths)

  );

  maxTokenLength = Math.max(...tokenLengths);

  return {
    maxTokenLength,
    schemeTree
  };

};
