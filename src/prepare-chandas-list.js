import { chandasList } from './chandas-list';

export const prepareChandasList = () => {

  const newChandasList = {};

  chandasList.forEach(chandas => {

    const chandasGanas = chandas.ganas;

    newChandasList[chandasGanas] = chandas;

  });

  return newChandasList;

};
