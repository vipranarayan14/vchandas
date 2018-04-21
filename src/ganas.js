const ganasList = {

  'ga,ga,ga': 'ma',
  'ga,ga,la': 'ta',
  'ga,la,ga': 'ra',
  'ga,la,la': 'bha',
  'la,ga,ga': 'ya',
  'la,ga,la': 'ja',
  'la,la,ga': 'sa',
  'la,la,la': 'na'

};

const makeMatraGroups = matras => {

  const chunk = 3;

  const matraGroups = [];

  for (let i = 0, len = matras.length; i < len; i += chunk) {

    matraGroups.push(matras.slice(i, i + chunk).join(','));

  }

  return matraGroups;

};

const getRadicalMatras = (index, matraGroup) =>

  (index > 0) ? `|${matraGroup}` : matraGroup;

export const getGanas = matras => {

  const ganas = [];

  let radicalMatras = '';

  const matraGroups = makeMatraGroups(matras);

  matraGroups.forEach((matraGroup, index) => {

    const gana = ganasList[matraGroup];

    if (gana) {

      ganas.push(gana);

    } else {

      radicalMatras = getRadicalMatras(index, matraGroup);

    }

  });

  return ganas.join(',') + radicalMatras;

};
