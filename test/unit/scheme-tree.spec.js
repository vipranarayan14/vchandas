import { expect } from 'chai';

import { makeSchemeTree } from '../../src/scheme-tree';
import { schemes } from 'vtranslit-schemes';

const devanagariScheme = schemes.Deva;

const {
  schemeTree,
  maxTokenLength
} = makeSchemeTree(devanagariScheme);

describe('schemeTree for vTokenize', () => {

  it('should be an object literal', () => {

    expect(schemeTree).to.be.an('object');

  });

  it('should contain all of these vowels - [`अ`, `आ`, `ऊ`, `ऋ`, `ऌ`, `औ`]', () => {

    expect(schemeTree).to.contain.all.keys(['अ', 'आ', 'ऊ', 'ऋ', 'ऌ', 'औ']);

  });

  it('should contain all of these consonants - [`क`, `ञ`, `ङ`, `ध`, `य`, `ळ`, `व`, `ष`]', () => {

    expect(schemeTree).to.contain.all.keys(['क', 'ञ', 'ङ', 'ध', 'य', 'ळ', 'व', 'ष']);

  });

  it('should contain all of these vowelMarks - [`ा`, `ू`, `ॄ`, `े`, `ै`, `ौ`, `ं`, `ः`]', () => {

    expect(schemeTree).to.contain.all.keys(['ा', 'ू', 'ॄ', 'े', 'ै', 'ौ', 'ं', 'ः']);

  });

  it('should not contain any of these symbols - [`०`, `४`, `।`, `ऽ`]', () => {

    expect(schemeTree).not.to.contain.any.of.keys(['०', '४', '।', 'ऽ']);

  });

  it('should not contain any of these - [``]', () => {

    expect(schemeTree).not.to.contain.any.of.keys(['']);

  });

  it('should return an object when char is looked up', () => {

    expect(schemeTree['ञ']).to.be.an('object');

  });

  it('should return the details of the given char', () => {

    expect(schemeTree['ङ']).to.deep.equal({
      akshara: 'ङ',
      matra: 1,
      type: 'consonants'
    });

  });

  it('should contain the matra of `त्` as 0.', () => {

    expect(schemeTree['त्']).to.deep.equal({
      akshara: 'त्',
      matra: 0,
      type: 'deadConsonants'
    });

  });

  it('should contain the matra of `प` as 1.', () => {

    expect(schemeTree['प']).to.deep.equal({
      akshara: 'प',
      matra: 1,
      type: 'consonants'
    });

  });

  it('should contain the matra of `ऋ` as 1.', () => {

    expect(schemeTree['ऋ']).to.deep.equal({
      akshara: 'ऋ',
      matra: 1,
      type: 'vowels'
    });

  });

  it('should contain the matra of `ॢ` as 1.', () => {

    expect(schemeTree['ॢ']).to.deep.equal({
      akshara: 'ॢ',
      matra: 1,
      type: 'vowelMarks'
    });

  });

  it('should contain the matra of `ए` as 2.', () => {

    expect(schemeTree['ए']).to.deep.equal({
      akshara: 'ए',
      matra: 2,
      type: 'vowels'
    });

  });

  it('should contain the matra of `ो` as 2.', () => {

    expect(schemeTree['ो']).to.deep.equal({
      akshara: 'ो',
      matra: 2,
      type: 'vowelMarks'
    });

  });

  it('should contain the matra of `ं` as 2.', () => {

    expect(schemeTree['ं']).to.deep.equal({
      akshara: 'ं',
      matra: 2,
      type: 'ayogavaha'
    });

  });

  it('should return `maxTokenLength` as 2.', () => {

    expect(maxTokenLength).to.equal(2);

  });

});
