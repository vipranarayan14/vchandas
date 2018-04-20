const setMatra = token => {

  let matra = { 'ayogavaha': 3, 'deadConsonants': 0, 'symbols': -1 }[token.type];

  if (matra !== undefined) {

    return Object.assign({}, token, { matra });

  }

  const shortVowelIndexes = { LLi: 8, RRi: 6, a: 0, i: 2, u: 4 };

  matra = (Object.values(shortVowelIndexes).includes(token.aksharaIndex)) ? 1 : 2;

  return Object.assign({}, token, { matra });

};

const setMatras = tokens => {

  const tokensWithMatras = [];

  tokens.forEach(token => {

    if (token.type !== 'unknown') {

      tokensWithMatras.push(setMatra(token));

    }

  });

  return tokensWithMatras;

};

const getPrevToken = (tokens, index) =>

  (index > 0) ? tokens[index - 1] : { matra: null, type: 'strStart' };

const getNextToken = (tokens, index) =>

  (index < tokens.length - 1) ? tokens[index + 1] : { matra: null, type: 'strEnd' };

const getMatraInsertIndex = matras =>

  (matras.length) ? matras.length - 1 : 0;

/* eslint-disable complexity */

const isPrevMatraGuru = (prevToken, token, nextToken) =>

  (
    token.matra === 0 &&
    prevToken.type === 'vowels' &&
    (
      nextToken.matra === 0 ||
      nextToken.type === 'strEnd'
    )
  ) || token.matra === 3;

export const getMatras = tokens => {

  const laghu = 'la';
  const guru = 'ga';

  const matras = [];

  const tokensWithMatras = setMatras(tokens);

  tokensWithMatras.forEach((token, index) => {

    const prevToken = getPrevToken(tokensWithMatras, index);
    const nextToken = getNextToken(tokensWithMatras, index);

    const matraInsertIndex = getMatraInsertIndex(matras);

    if (isPrevMatraGuru(prevToken, token, nextToken)) {

      matras[matraInsertIndex] = guru;

    }

    if (token.matra === 1) {

      matras.push(laghu);

    } else if (token.matra === 2) {

      matras.push(guru);

    }

  });

  return matras;

};
