export const getSliceDetails = schemeTree => slice => {

  let sliceDetails = {};

  const sliceDetailsInSchemeTree = schemeTree[slice];

  if (sliceDetailsInSchemeTree) {

    sliceDetails = sliceDetailsInSchemeTree;

  } else if (slice === ' ') {

    sliceDetails = {
      akshara: slice,
      type: 'space'
    };

  } else {

    sliceDetails = { //TODO: Handle 'unknown' slices in vTokenize
      akshara: '',
      type: 'unknown'
    };

  }

  return sliceDetails;

};
