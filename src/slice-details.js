export const getSliceDetails = schemeTree => slice => {

  let sliceDetails = {};

  const sliceDetailsInSchemeTree = schemeTree[slice];

  if (sliceDetailsInSchemeTree) {

    sliceDetails = sliceDetailsInSchemeTree;

  } else {

    sliceDetails = { //TODO: Handle 'unknown' slices in vTokenize
      akshara: '',
      type: 'unknown'
    };

  }

  return sliceDetails;

};
