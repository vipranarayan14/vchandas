export const getChandas = (ganas, chandasList) => {

  let chandas = '';

  for (let i = 0, l = chandasList.length; i < l; i += 1) {

    if (ganas === (chandasList[i].ganas)) {

      chandas = chandasList[i];

      break;

    }

  }

  return chandas;

};
