import { devanagariScheme } from 'vtranslit-schemes';
import { expect } from 'chai';
import { makeSchemeTree } from '../../src/scheme-tree';

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
      aksharaIndex: 4,
      type: 'consonants'
    });

  });

  it('should return `maxTokenLength` as 2.', () => {

    expect(maxTokenLength).to.equal(2);

  });

});
