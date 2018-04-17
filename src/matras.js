export const getMatra = (type, aksharaIndex) => {

  let matra = { 'ayogavaha': 2, 'consonants': 1, 'deadConsonants': 0, }[type];

  if (matra !== undefined) {

    return matra;

  }

  const shortVowelIndexes = { LLi: 8, RRi: 6, a: 0, i: 2, u: 4 };

  matra = (Object.values(shortVowelIndexes).includes(aksharaIndex)) ? 1 : 2;

  return matra;

};

/* eslint-disable complexity */

export const getMatras = tokens => {

  const matras = [];

  tokens.forEach((token, index) => {

    const prevToken = (index > 0) ? tokens[index - 1] : { matra: undefined };
    const matraInsertIndex = (matras.length) ? matras.length - 1 : 0;

    if (token.matra === 0) {

      if (prevToken.matra === 1) {

        matras[matraInsertIndex] = 2;

      }

    } else if (token.matra === 1) {

      if (token.type !== 'vowelMarks') {

        matras.push(token.matra);

      }

    } else if (token.matra === 2) {

      if (prevToken.matra === 1) {

        matras[matraInsertIndex] = token.matra;

      } else {

        matras.push(token.matra);

      }

    }

  });

  return matras;

};
