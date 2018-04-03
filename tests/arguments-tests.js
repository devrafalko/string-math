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

describe("When the module is executed with incorrect [non-String] first argument and [Function] second argument",function(){
  beforeEach(function(){
    this.callback = jasmine.createSpy('callback');
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

  it('it should not throw an error',function(){
    for(var type of this.types){
      expect(this.stringMath.bind(this,type,function(){})).not.toThrowError();
    }
  });
  it('it should call this function with error object as the first argument and result value equal to null as the second argument',function(){
    for(var type of this.types){
      expect(this.stringMath.bind(this,type,this.callback)).not.toThrowError();
      expect(this.callback).toHaveBeenCalled();
      expect(this.callback).toHaveBeenCalledWith(jasmine.any(Error), null);
    }
  });

  it('it should return null',function(){
    for(var type of this.types){
      expect(this.stringMath(type,function(){})).toEqual(null);
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

describe("When the module is executed with correct [String] first argument and [Function] second argument",function(){
  beforeEach(function(){
    this.callback = jasmine.createSpy('callback');
    this.stringMath = stringMath;
  });

  it('it should not throw an error',function(){
    expect(this.stringMath.bind(this,'2+2',function(){})).not.toThrowError();
  });

  it('it should call this function with null as the first argument and [Number] result value as the second argument',function(){
    expect(this.stringMath.bind(this,'2+2',this.callback)).not.toThrowError();
    expect(this.callback).toHaveBeenCalled();
    expect(this.callback).toHaveBeenCalledWith(null,jasmine.any(Number));
  });

  it('it should return [Number] value',function(){
    expect(this.stringMath('2+2',function(){})).toEqual(jasmine.any(Number));
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

describe("When the module is executed with correct [String] first argument but of incorrect arithmetical formula and [Function] second argument",function(){
  beforeEach(function(){
    this.callback = jasmine.createSpy('callback');
    this.incorrectList = incorrects;
    this.stringMath = stringMath;
  });

  it('it should not throw an error',function(){
    for(var incorrect of this.incorrectList){
      expect(this.stringMath.bind(this,incorrect,function(){})).not.toThrowError();
    }
  });

  it('it should call this function with error object as the first argument and result value equal to null as the second argument',function(){
    for(var incorrect of this.incorrectList){
      expect(this.stringMath.bind(this,incorrect,this.callback)).not.toThrowError();
      expect(this.callback).toHaveBeenCalled();
      expect(this.callback).toHaveBeenCalledWith(jasmine.any(Error), null);
    }
  });

  it('it should return null',function(){
    for(var incorrect of this.incorrectList){
      expect(this.stringMath(incorrect,function(){})).toEqual(null);
    }
  });


});