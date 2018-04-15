export const getSliceDetails = schemeTree => slice => {

  let sliceDetails = {};

  const sliceDetailsInSchemeTree = schemeTree[slice];

  if (sliceDetailsInSchemeTree) {

    sliceDetails = sliceDetailsInSchemeTree;

  } else {

    sliceDetails = {
      slice,
      type: 'unknown'
    };

  }

  return sliceDetails;

};
