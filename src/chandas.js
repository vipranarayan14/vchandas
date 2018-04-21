const makeGanasKey = ganas =>

  (ganas.ganas.length && ganas.looseMatras) ? (
    `${ganas.ganas}|${ganas.looseMatras}`
  ) : (
    `${ganas.ganas}${ganas.looseMatras}`
  );

export const getChandas = (ganas, chandasList) => {

  const ganasKey = makeGanasKey(ganas);

  const chandas = chandasList[ganasKey];

  if (chandas) {

    return chandas;

  }

  return null;

};
