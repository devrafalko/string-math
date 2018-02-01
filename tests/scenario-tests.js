/* global expect */

const path = require('path');
const stringMath = require(path.resolve('./string-math.js'));
const scenarios = require('./scenarios.js');

describe("The arithmetic expression",function(){
  for(var i in scenarios){
    let {expression,result} = scenarios[i];
    it(`"${expression}" should amount to: ${result}.`,function(){
      const a = stringMath(expression);
      expect(stringMath(expression)).toBe(result);
    });
  }
});