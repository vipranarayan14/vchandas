const setMatra = token => {

  let matra = { 'ayogavaha': 2, 'consonants': 1, 'deadConsonants': 0, }[token.type];

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

/* eslint-disable complexity */

export const getMatras = tokens => {

  const matras = [];

  const tokensWithMatras = setMatras(tokens);

  tokensWithMatras.forEach((token, index) => {

    const prevToken = (index > 0) ? tokensWithMatras[index - 1] : { matra: undefined };
    const matraInsertIndex = (matras.length) ? matras.length - 1 : 0;

    if (token.matra === 0) {

      if (prevToken.matra === 1) {

        matras[matraInsertIndex] = 'ga';

      }

    } else if (token.matra === 1) {

      if (token.type !== 'vowelMarks') {

        matras.push('la');

      }

    } else if (token.matra === 2) {

      if (prevToken.matra === 1) {

        matras[matraInsertIndex] = 'ga';

      } else {

        matras.push('ga');

      }

    }

  });

  return matras;

};
