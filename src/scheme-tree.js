const makeSchemeLeaf = (akshara, aksharaIndex, alternateIndex, schemeBranch, schemeSubset, tokenLengths) => {

  if (akshara) {

    schemeBranch[akshara] = {

      aksharaIndex: `${schemeSubset}#${aksharaIndex}`,
      alternateIndex,
      char: akshara,
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
      0,
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
    makeSchemeBranch(fromScheme, 'symbols', tokenLengths)

  );

  maxTokenLength = Math.max(...tokenLengths);

  return {
    maxTokenLength,
    schemeTree
  };

};
