function longestCommonPrefix(strs: string[]): string {
  const len = strs.length
  if (len <= 0) {
    return ''
  }

  let answer = strs[0]
  for (let i = 1; i < len; ++i) {
    const curr = strs[i]

    let j = 0
    while (answer[j] && curr[j]) {
      if (answer[j] != curr[j]) {
        break
      }

      ++j
    }

    answer = answer.slice(0, j)
  }

  return answer
}

function longestCommonPrefix111(strs: string[]): string {
  const len0 = strs.length
  if (len0 <= 0) {
    return ''
  }

  const len1 = strs[0].length

  for (let i = 0; i < len1; ++i) {
    const mark = strs[0][i]
    for (let j = 1; j < len0; ++j) {
      if (mark != strs[j][i]) {
        return strs[j].slice(0, i)
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
