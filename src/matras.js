export const getMatra = (type, aksharaIndex) => {

  let matra = { 'ayogavaha': 2, 'consonants': 1, 'deadConsonants': 0, }[type];

  if (matra !== undefined) {

    return matra;

  }

  const shortVowelIndexes = { LLi: 8, RRi: 6, a: 0, i: 2, u: 4 };

  matra = (Object.values(shortVowelIndexes).includes(aksharaIndex)) ? 1 : 2;

  return matra;

};

export const getMatras = tokens => {

  const matras = [];

  tokens.forEach(token => token.matra);

  return matras;

};
