const ganasList = [

  {
    name: 'Ma',
    pattern: 'G,G,G'
  },
  {
    name: 'Na',
    pattern: 'L,L,L'
  },
  {
    name: 'Bha',
    pattern: 'G,L,L'
  },
  {
    name: 'Ya',
    pattern: 'L,G,G'
  },
  {
    name: 'Ja',
    pattern: 'L,G,L'
  },
  {
    name: 'Ra',
    pattern: 'G,L,G'
  },
  {
    name: 'Sa',
    pattern: 'L,L,G'
  },
  {
    name: 'Ta',
    pattern: 'G,G,L'
  }

];

export const getGanas = matras => {

  const ganas = [];

  const matraGroups = [];

  const matrasCopy = matras.slice(0);

  while (matrasCopy.length) {

    matraGroups.push(matrasCopy.splice(0, 3));

  }

  ganasList.find(gana => gana.pattern === matraGroups); //TODO: handle reminder matras.

  return ganas;

};
