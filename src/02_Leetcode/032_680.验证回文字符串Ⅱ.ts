function main() {
  // const s = 'aba'
  // const s = 'abca'
  // const s = 'abdcdba'
  const s = 'cbbcc'

  console.log('[]:', validPalindrome(s))
  console.log('[]:', validPalindrome111(s))
}

main()

function validPalindrome(s: string): boolean {
  const len = s.length
  let i = 0
  let j = len - 1
  let res = true

  while (i < j) {
    if (s[i] != s[j]) {
      res = false
      break
    }

    ++i
    --j
  }

  if (res) {
    console.log('[删除位置]:', '无需删除')
    return true
  }

  for (let k = 0; k < len; ++k) {
    i = 0
    j = len - 1
    res = true

    while (i <= j) {
      if (i == k) ++i
      if (j == k) --j

      if (s[i] != s[j]) {
        res = false
        break
      }

      ++i
      --j
    }

    if (res) {
      console.log('[删除位置]:', k)
      return true
    }
  }

  return false
}

function validPalindrome111(s: string): boolean {
  const len = s.length
  let low = 0
  let high = len - 1

  while (low < high) {
    if (s[low] == s[high]) {
      ++low
      --high
    } else {
      return validPalindromeAssist(s, low + 1, high) || validPalindromeAssist(s, low, high - 1)
    }
  }

  return true
}

function validPalindromeAssist(s: string, low: number, high: number): boolean {
  let i = low
  let j = high
  while (i < j) {
    if (s[i] != s[j]) {
      return false
    }

    ++i
    --j
  }

  return true
}
