/* global expect */

const path = require('path');
const stringMath = require(path.resolve('./string-math.js'));
const incorrects = require('./incorrects.js');

describe("When the module is executed without any arguments",function(){
  beforeEach(function(){
    this.stringMath = stringMath.bind(this);
  });
  
  it('it should throw an error',function(){
    expect(this.stringMath).toThrowError();
  });
});

describe("When the module is executed with incorrect [non-String] argument",function(){
  beforeEach(function(){
    this.types = [
      1,
      true,
      null,
      {},
      [],
      /hello/,
      ()=>{}
    ];
    this.stringMath = stringMath;
  });

  it('it should throw an error',function(){
    for(var type of this.types){
      expect(this.stringMath.bind(this,type)).toThrowError('The [String] argument is expected.');
    }
  });
});

describe("When the module is executed with correct [String] argument",function(){
  beforeEach(function(){
    this.stringMath = stringMath.bind(this,'2+2');
  });

  it('it should not throw an error',function(){
    expect(this.stringMath).not.toThrowError();
  });
});

describe("When the module is executed with correct [String] argument but incorrect arithmetical formula",function(){
  beforeEach(function(){
    this.incorrectList = incorrects;
    this.stringMath = stringMath;
  });

  it('it should throw an error',function(){
    for(var incorrect of this.incorrectList){
      expect(this.stringMath.bind(this,incorrect)).toThrowError('The equation is invalid.');
    }
  });
});