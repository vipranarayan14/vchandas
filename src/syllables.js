/* eslint-disable complexity */

export const getSyllables = tokens => {

  const syllables = [];

  tokens.forEach((token, index) => {

    const prevToken = (index > 0) ? tokens[index - 1] : { type: 'strStart' };
    const isLastToken = index === tokens.length - 1;

    if (token.type === 'deadConsonants') {

      if (isLastToken || prevToken.type === 'deadConsonants') {

        syllables[syllables.length - 1] += token.akshara;

      } else {

        syllables.push(token.akshara);

      }

    } else if (token.type === 'ayogavaha' && prevToken.type === 'vowels') {

      syllables[syllables.length - 1] += token.akshara;

    } else if (token.type === 'vowels') {

      if (prevToken.type === 'deadConsonants') {

        syllables[syllables.length - 1] += token.akshara;

      } else {

        syllables.push(token.akshara);

      }

    }

  });

  return syllables;

};
