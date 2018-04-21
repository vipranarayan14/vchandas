export const getChandas = (ganasKey, chandasList) => {

  const chandas = chandasList[ganasKey];

  if (chandas) {

    return chandas;

  }

  return null;

};
