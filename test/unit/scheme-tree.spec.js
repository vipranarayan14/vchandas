import { expect } from 'chai';
import { makeSchemeTree } from '../../src/scheme-tree';
import { vTranslitSchemeItrn } from 'vtranslit-scheme-itrn';

const {
  schemeTree,
  maxTokenLength
} = makeSchemeTree(vTranslitSchemeItrn);

describe('schemeTree for vTokenize', () => {

  it('should be an object literal', () => {

    expect(schemeTree).to.be.an('object');

  });

  it('should contain all of these vowels - [`a`, `A`, `U`, `RRi`, `LLi`, `au`]', () => {

    expect(schemeTree).to.contain.all.keys(['a', 'A', 'U', 'RRi', 'LLi', 'au']);

  });

  it('should contain all of these deadConsonants - [`k`, `~n`, `~N`, `dh`, `y`, `L`, `v`, `Sh`]', () => {

    expect(schemeTree).to.contain.all.of.keys(['k', '~n', '~N', 'dh', 'y', 'L', 'v', 'Sh']);

  });

  it('should contain all of these symbols - [`0`, `4`, `|`, `.a`]', () => {

    expect(schemeTree).to.contain.all.keys(['0', '4', '|', '.a']);

  });

  it('should not contain any of these - [``]', () => {

    expect(schemeTree).not.to.contain.any.of.keys(['']);

  });

  it('should return an object when char is looked up', () => {

    expect(schemeTree['~n']).to.be.an('object');

  });

  it('should return the details of the given char', () => {

    expect(schemeTree['~N']).to.deep.equal({
      akshara: '~N',
      aksharaIndex: 4,
      type: 'deadConsonants'
    });

  });

  it('should return `maxTokenLength` as 4.', () => {

    const expectedMaxTokenLength = 3;

    expect(maxTokenLength).to.equal(expectedMaxTokenLength);

  });

});
