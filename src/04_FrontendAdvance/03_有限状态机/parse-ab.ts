/**
 * only can handle whether str include 'ab'
 * @param str
 * @returns
 */
export function runFsmWithAb(str?: string) {
  if (!str) return false

  let i = 0,
    res = ''
  const len = str.length
  while (true) {
    if (i >= len) break

    const char = str[i]
    if (char == 'a') {
      res += char
    }

    if (char == 'b') {
      res += char
    }

    if (res == 'abc') {
      return true
    }

    if (char != 'a' && char != 'b') {
      res = ''
    }

    ++i
  }

  return false
}
