function decodeString111(s: string): string {
  const len = s.length
  let currStr = '',
    currTimes = '',
    ans = ''

  const stack: {
    s: string
    times: number
  }[] = []

  for (let i = 0; i < len; ++i) {
    const char = s.charAt(i)

    // case number
    if (!isNaN(Number(char))) {
      currTimes = currTimes + char
      continue
    }

    switch (char) {
      case '[':
        stack.push({
          s: currStr,
          times: Number(currTimes),
        })

        // After pushing, empty temporary variables
        currStr = ''
        currTimes = ''
        break
      case ']':
        const { s, times } = stack.pop()

        const combined = s + repeat(currStr, times)
        if (stack.length > 0) {
          currStr = combined
        } else {
          currStr = ''
          ans = ans + combined
        }

        break
      default:
        currStr = currStr + char
        break
    }
  }

  return ans + currStr
  function repeat(s: string, times: number) {
    let ans = ''
    for (let i = 0; i < times; ++i) {
      ans += s
    }

    return ans
  }
}

function main() {
  const s = '3[a]2[bc]'
  // const s = '3[a2[c]]'
  // const s = '2[abc]3[cd]ef'
  // const s = 'abc3[cd]xyz'
  // const s = '100[leetcode]'
  // const s = 'head1[3[a2[c]]]tail'
  // const s = '3[z]2[2[y]pq4[2[jk]e1[f]]]ef'

  // console.log('[]:', decodeString(s))
  console.log('[]:', decodeString111(s))
}

main()

export {}
