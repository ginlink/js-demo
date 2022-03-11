function longestPalindrome(s: string): string {
  const len = s.length
  // error:
  // const dep: boolean[][] = new Array(len).fill([])
  const dep: boolean[][] = new Array(len)
  let begin = 0,
    maxLen = 1

  // the substring's length is 1, so it is a palindrome
  for (let i = 0; i < len; ++i) {
    const newArr = new Array(len)
    newArr[i] = true
    dep[i] = newArr
  }

  for (let size = 2; size <= len; ++size) {
    for (let i = 0; i < len; ++i) {
      // size is [i, j]'s length
      // size = j - i + 1 ==> j = size + i -1
      const j = size + i - 1

      if (j >= len) {
        break
      }

      if (s[i] !== s[j]) {
        dep[i][j] = false
      } else {
        if (j - i + 1 <= 3) {
          dep[i][j] = true
        } else {
          dep[i][j] = dep[i + 1][j - 1]
        }
      }

      const newMaxLen = j - i + 1
      if (dep[i][j] && newMaxLen > maxLen) {
        maxLen = newMaxLen
        begin = i
      }
    }
  }

  return s.substring(begin, begin + maxLen)
}

function main() {
  const s = 'babbd'
  // const s = 'cbbd'

  console.log('[]:', longestPalindrome(s))
}

main()

export {}
