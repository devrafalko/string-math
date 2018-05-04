# Description

`string-math` is a module *(function)* that computes the `[Number]` result from the `[String]` arithmetical formula.
* It **does not use** `eval()`
* It uses regular expressions to parse [String] formulas `"2+2"` into [Number] formulas `2+2`. Then it is performed as the common JavaScript arithmetic operation.

```javascript
"2 + 2"  //4
"3*(5-2)"  //9
" 2.5  *   2.5  /   .1" //62.5
"3.5+5*(-4-(3/(3+1)-12*3-.2*22)-16/4*12-5/(2)+3.5+2.5*(1.5-2*7))-16" //-225.5
".25e+2*10" //250
```

* Any bugs found? Give me to know on [GitHub](https://github.com/devrafalko/string-math)
* If you need to perform arithmetic formulas with the **floating point precision** *(avoid `0.30000000000000004` return values)* or to perform arithmetic formulas with **big numbers**, check out [**`exact-math`**](https://www.npmjs.com/package/exact-math) package. It implements `string-math` features as the `exactMath.formula` method.


# Installation

#### with NodeJS / bundlers

`npm install string-math`

```javascript
var stringMath = require('string-math');

stringMath("--1") //1
stringMath("2/-2") //-1
stringMath("-5-5") //-10
```

#### with Browser

##### 1. Add string-math.js to the HTML file.
```html
<head>
  <script src="./string-math.js"></script>
</head>
```
> Any other dependencies are needed.

##### 2. Use `stringMath` **global Function** from `string-math.js`.
```javascript
var result = stringMath("2+2");
```

##### Browser Support
|Chrome|Firefox|IE|Safari|Opera|
:---:|:---:|:---:|:---:|:---:|
|yes|yes|yes|yes|yes|

# Tests
```
> git clone https://github.com/devrafalko/string-math.git
> cd string-math
> npm install
> npm test
> npm test deep //displays error messages
```

# Usage

### `stringMath(expression[,callback])`
##### `expression` **[String]**
* the arithmetical formula
* it can contain:
  * `[0-9]` digits
  * `1.5`, `0.5` or `.5` decimal fractions
  * `-5`, `-.4`, `-5.55` negative values
  * `2e-2`, `.25e+12`, `-3e-10` exponential notation values
  * `*` multiplication sign
  * `/` division sign
  * `+` plus sign
  * `-` subtraction sign
  * `(` and `)` parentheses

##### `callback` **[Function]** *(optional)* *(synchronous)*
* by default, if the `callback` argument **is omitted** and the `expression` is of incorrect type or is invalid, the `Error` object is **`thrown`**. If the `callback` is defined, the `Error` object is passed through the `callback` function, rather than being **`thrown`**.
* if the [Function] `callback` argument is defined, it is called with the following arguments:
  * [0] `error`  
    It equals `null`, if the `expression` is of correct type and is valid math formula.  
    Otherwise it equals `Error` object.
  * [1] `result`  
    It equals `null` if the `expression` is of incorrect type or if the math formula is invalid.  
    Otherwise it equals [Number] result.

# Return

If the math formula is of correct type and is valid, it returns the [Number] result. Otherwise it returns `null`.

# Tips
* the arithmetic **order of operations** is respected:
  * *parentheses first*
  * *then division and multiplication (from left to right)*
  * *then addition and subtraction (from left to right)*
* the multiplication sign can be omitted before parentheses; `4(2+1)`; *equals to `4*(2+1)`*
* the following signs combinations are allowed:
  * `2 * -2`; *equals to `2 * (-2)`*
  * `2 / -2`; *equals to `2 / (-2)`*
  * `+2 + 2`; *equals to `2 + 2`*
  * `2 + +2`; *equals to 2 + 2*
  * `-2 - -2` *equals to `-2 + 2`*
  * `-2 - +2` *equals to `-2 - 2`*
  * `-2 + -2` *equals to `-2 - 2`*
* the (multi)spaces between values, signs and parentheses are allowed:
  * `2 + 2`
  * `2 +  ( -2 - -2)`
  * ` 2  +  (+2  +   +4   /   -1)`
  * `  -.1   -   -5`
  * `2 + 3e-5`
  * `.25e+5 * -.25e-5`
* the spaces are **not allowed** between:
  * negative sign and value: `-2 - - 2`
  * period and digit in decimal fraction: `5 + . 3`
  * exponential notation formula: `.2 e-5`, `2e - 5`, `3e +10`