/* eslint-disable complexity */

export const getSyllables = tokens => {

  const syllables = [];

  tokens.forEach((token, index) => {

    const prevToken = (index > 0) ? tokens[index - 1] : { type: 'strStart' };

    if (token.type === 'deadConsonants') {

      if (index === tokens.length - 1) {

        syllables[syllables.length - 1] += token.akshara;

      } else {

        syllables.push(token.akshara);

      }

    } else if (token.type === 'consonants') {

      if (prevToken.type === 'deadConsonants') {

        syllables[syllables.length - 1] += token.akshara;

      } else {

        syllables.push(token.akshara);

      }

    } else if (token.type === 'vowelMarks' && prevToken.type === 'consonants') {

      syllables[syllables.length - 1] += token.akshara;

    } else if (
      token.type === 'ayogavaha' &&
      (
        prevToken.type === 'vowelMarks' ||
        prevToken.type === 'consonants'
      )
    ) {

      syllables[syllables.length - 1] += token.akshara;

    } else if (token.type === 'vowels') {

      syllables.push(token.akshara);

    }

  });

  return syllables;

};
