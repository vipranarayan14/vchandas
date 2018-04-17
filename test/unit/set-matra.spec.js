import { expect } from 'chai';

import { makeSchemeTree } from '../../src/scheme-tree';
import rewire from 'rewire';
import { schemes } from 'vtranslit-schemes';

const devanagariScheme = schemes.Deva;

const { schemeTree } = makeSchemeTree(devanagariScheme);

// for testing a private module
const matras = rewire('../../src/matras');
const setMatra = matras.__get__('setMatra'); // eslint-disable-line no-underscore-dangle

describe('setMatra', () => {

  it('should contain the matra of `त्` as 0.', () => {

    expect(setMatra(schemeTree['त्']).matra).to.equal(0);

  });

  it('should contain the matra of `प` as 1.', () => {

    expect(setMatra(schemeTree['प']).matra).to.equal(1);

  });

  it('should contain the matra of `ऋ` as 1.', () => {

    expect(setMatra(schemeTree['ऋ']).matra).to.equal(1);

  });

  it('should contain the matra of `ॢ` as 1.', () => {

    expect(setMatra(schemeTree['ॢ']).matra).to.equal(1);

  });

  it('should contain the matra of `ए` as 2.', () => {

    expect(setMatra(schemeTree['ए']).matra).to.equal(2);

  });

  it('should contain the matra of `ो` as 2.', () => {

    expect(setMatra(schemeTree['ो']).matra).to.equal(2);

  });

  it('should contain the matra of `ं` as 2.', () => {

    expect(setMatra(schemeTree['ं']).matra).to.equal(2);

  });

});
