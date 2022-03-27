function longestCommonPrefix(strs: string[]): string {
  const len = strs.length

  if (len <= 0) {
    return ''
  }

  let answer = strs[0]
  for (let i = 1; i < len; ++i) {
    const curr = strs[i]

    answer = longest(answer, curr)

    if (answer == '') {
      return ''
    }
  }

  return answer

  function longest(pre: string, curr: string): string {
    let i = 0
    while (pre[i] && curr[i]) {
      if (pre[i] != curr[i]) {
        break
      }
      ++i
    }

    return pre.slice(0, i)
  }
}

function longestCommonPrefix111(strs: string[]): string {
  const len = strs.length
  if (len <= 0) {
    return ''
  }

  let maxLen = -Infinity
  for (let i = 0; i < len; ++i) {
    maxLen = Math.max(maxLen, strs[i].length)
  }

  for (let i = 0; i < maxLen; ++i) {
    let mark = strs[0][i]
    for (let j = 1; j < len; ++j) {
      if (strs[j][i] != mark) {
        return strs[0].slice(0, i)
      }
    }
  }

  return strs[0]
}

function main() {
  const strs = ['flower', 'flow', 'flight']
  // const strs = ['dog', 'racecar', 'car']
  // const strs = ['a']

  console.log('[]:', longestCommonPrefix(strs))
  console.log('[]:', longestCommonPrefix111(strs))
}

main()

export {}
