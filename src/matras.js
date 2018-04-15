const getMatra = () => {

};

export const getMatras = tokens => {

  const matras = [];

  tokens.forEach(token => {

    getMatra(token, tokens);

  });

  return matras;

};
