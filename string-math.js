function scientificToDecimal(num) {
  //if the number is in scientific notation remove it
  if (/\d+\.?\d*e[\+\-]*\d+/i.test(num)) {
    const zero = '0',
      parts = String(num)
        .toLowerCase()
        .split('e'), //split into coeff and exponent
      exponent = parts.pop(), //store the exponential part
      zeros = Math.abs(exponent), //get the number of zeros
      sign = exponent / zeros,
      coeff_array = parts[0].split('.')
    if (sign === -1) {
      num = zero + '.' + new Array(zeros).join(zero) + coeff_array.join('')
    } else {
      let dec = coeff_array[1]
      if (dec) zeros = zeros - dec.length
      num = coeff_array.join('') + new Array(zeros + 1).join(zero)
    }
  }

  return num
}

function stringMath(eq) {
  if (typeof eq !== 'string') throw TypeError('The [String] argument is expected.')
  const mulDiv = /(-?\d*\.?\d+)\s*([*/])\s*([+-]?\d*\.?\d+)/
  const plusMin = /([+-]?\d*\.?\d+)\s*([+-])\s*([+-]?\d*\.?\d+)/
  const parentheses = /(\d)?\s*\(([^()]*)\)\s*/
  var current
  while (eq.search(/^\s*([+-]?\d*\.?\d+)\s*$/) === -1) {
    eq = fParentheses(eq)
    if (eq === current) throw new SyntaxError('The equation is invalid.')
    current = eq
  }
  return +eq

  function fParentheses(eq) {
    while (eq.search(parentheses) !== -1) {
      eq = eq.replace(parentheses, function(a, b, c) {
        c = fMulDiv(c)
        c = fPlusMin(c)
        return typeof b === 'string' ? `${b}*${c}` : c
      })
    }
    eq = fMulDiv(eq)
    eq = fPlusMin(eq)
    return scientificToDecimal(eq)
  }

  function fMulDiv(eq) {
    while (eq.search(mulDiv) !== -1) {
      eq = eq.replace(mulDiv, function(a) {
        const sides = mulDiv.exec(a)
        return sides[2] === '*' ? sides[1] * sides[3] : sides[1] / sides[3]
      })
    }
    return scientificToDecimal(eq)
  }

  function fPlusMin(eq) {
    eq = eq.replace(/([+-])([+-])(\d|\.)/g, function(a, b, c, d) {
      return `${b === c ? '+' : '-'}${d}`
    })
    while (eq.search(plusMin) !== -1) {
      eq = eq.replace(plusMin, function(a) {
        const sides = plusMin.exec(a)
        return sides[2] === '+' ? +sides[1] + +sides[3] : sides[1] - sides[3]
      })
    }
    return scientificToDecimal(eq)
  }
}

if (typeof module !== 'undefined' && typeof exports !== 'undefined' && module.exports) {
  module.exports = stringMath
}
