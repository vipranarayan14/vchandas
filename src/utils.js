export const cleanString = str =>

  str.slice(0).trim().replace(/\s\s*/g, ' ');

export const removeSpaces = tokens =>

  tokens.filter(token => token.type !== 'space');
