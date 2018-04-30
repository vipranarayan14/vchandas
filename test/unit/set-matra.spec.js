import { expect } from 'chai';
import { makeSchemeTree } from '../../src/scheme-tree';
import rewire from 'rewire';
import { vTranslitSchemeItrn } from 'vtranslit-scheme-itrn';

const { schemeTree } = makeSchemeTree(vTranslitSchemeItrn);

// for testing a private module
const matras = rewire('../../src/matras');
const setMatra = matras.__get__('setMatra'); // eslint-disable-line no-underscore-dangle

describe('setMatra', () => {

  it('should contain the matra of `t` as 0.', () => {

    expect(setMatra(schemeTree.t).matra).to.equal(0);

  });

  it('should contain the matra of `RRi` as 1.', () => {

    expect(setMatra(schemeTree.RRi).matra).to.equal(1);

  });

  it('should contain the matra of `e` as 2.', () => {

    expect(setMatra(schemeTree.e).matra).to.equal(2);

  });

  it('should contain the matra of `o` as 2.', () => {

    expect(setMatra(schemeTree.o).matra).to.equal(2);

  });

  it('should contain the matra of `M` as 2.', () => {

    expect(setMatra(schemeTree.M).matra).to.equal(3);

  });

});
