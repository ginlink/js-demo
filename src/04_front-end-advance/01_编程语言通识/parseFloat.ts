/**
 * goal : '0.1' => 0.1
 *  '1.1' => 1.1
 *  '1.1a' => 1.1
 * @param origin
 * @param x
 * @returns
 */
export function myParseFloat(origin: string | undefined, x = 10) {
  if (!origin) return

  // num
  let num = 0,
    i = 0,
    len = origin.length

  while (i < len && origin[i] !== '.') {
    // console.log('[](origin[i]):', origin[i], num)

    num = x * num
    num += origin[i].codePointAt(0) - '0'.codePointAt(0)

    ++i
  }

  if (origin[i] === '.') ++i

  const fractionStartPos = i
  let fraction = 0
  while (i < len) {
    fraction = x * fraction

    fraction += origin[i].codePointAt(0) - '0'.codePointAt(0)
    ++i
  }
  const fractionLen = i - fractionStartPos

  // console.log('[](decimal):', num, fraction / Math.pow(x, fractionLen))
  return num + fraction / Math.pow(x, fractionLen)
}

console.log('[]:', myParseFloat('100.33', 10))
console.log('[]:', myParseFloat('100.333333', 10))
console.log('[]:', myParseFloat('16', 10))

// console.log('[]:', parseFloat('0xff'))
