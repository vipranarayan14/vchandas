export const getChandas = (ganas, chandasList) => {

  const chandas = chandasList[ganas];

  if (chandas) {

    return chandas;

  }

  return { name: 'Not found' };

};
