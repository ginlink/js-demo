function main() {
  // const s = 'babbd'
  const s = 'cbbd'

  console.log('[]:', longestPalindrome(s))

  createArrayTest()
}

main()

function longestPalindrome(s: string): string {
  const len = s.length

  if (len < 2) {
    return s
  }

  let max = -Infinity
  let begin = 0
  const dp: boolean[][] = new Array(len)
  for (let i = 0; i < len; ++i) {
    dp[i] = new Array(len).fill(true)
  }

  for (let L = 2; L <= len; ++L) {
    for (let i = 0; i < len; ++i) {
      const j = L + i - 1

      if (j >= len) {
        break
      }

      if (s[i] != s[j]) {
        dp[i][j] = false
      } else {
        dp[i][j] = j - i <= 2 ? true : dp[i + 1][j - 1]
      }

      if (dp[i][j] && j - i + 1 > max) {
        max = j - i + 1
        begin = i
      }
    }
  }

  return s.slice(begin, begin + max)
}

function createArrayTest() {
  const len = 3

  const dp: boolean[][] = new Array(len).fill(new Array(len).fill(true))
  console.log('[dp]:', dp)

  dp[0][1] = false
  console.log('[dp]:', dp)

  // const a = [
  //   [true, false, true],
  //   [true, false, true],
  //   [true, false, true],
  // ]
}
