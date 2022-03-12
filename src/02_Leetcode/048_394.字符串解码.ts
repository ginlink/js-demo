// ❌ failed
function decodeString(s: string): string {
  const len = s.length
  const stack = []
  let ans = ''

  for (let i = len - 1; i >= 0; --i) {
    let substring = ''

    console.log('[stack]:', stack, i)

    if (s[i] == ']') {
      let curr2 = ''

      while (stack.length > 0 && stack[stack.length - 1] != ']') {
        const el = stack.pop()

        curr2 += el
      }
      ans = curr2 + ans
    }

    let top = stack[stack.length - 1]
    switch (top) {
      case '[':
        let times = ''

        for (let j = i; j >= 0; --j) {
          if (isNaN(Number(s[j]))) {
            break
          }

          times = s[j] + times
        }

        while (true) {
          const el = stack.pop()

          if (el == ']') {
            break
          }

          if (el == '[') {
            continue
          }

          substring += el
        }

        // ab => abab
        // ab => ababab

        console.log('[times]:', times)
        console.log('[ans]:', ans)

        const curr = repeat(substring, Number(times))
        console.log('[curr]:', curr)

        top = stack[stack.length - 1]
        if (stack.length > 0 && top == ']') {
          for (let j = curr.length - 1; j >= 0; --j) {
            stack.push(curr[j])
          }
        } else {
          ans = curr + ans
        }

        // skip number
        i = i - (times.length - 1)

        break

      default:
        stack.push(s[i])
    }
  }

  console.log('[stack111]:', stack)
  let curr3 = ''
  while (stack.length > 0) {
    const el = stack.pop()

    console.log('[el]:', el)
    curr3 += el
  }

  return curr3 + ans

  function repeat(s: string, times: number) {
    let ans = ''
    for (let i = 0; i < times; ++i) {
      ans += s
    }

    return ans
  }
}

// ✅ success
function decodeString111(s: string): string {
  const len = s.length
  let curr = '',
    currTime = '',
    ans = ''

  const stack: {
    times: number
    s: string
  }[] = []

  for (let i = 0; i < len; ++i) {
    // four case:
    // 1.number Record the number of
    // 2.char   Add temporary strings
    // 3.[      Into the stack
    // 4.]      Out of the stack

    console.log('[stack]:', stack)

    const time = Number(s[i])

    if (!isNaN(time)) {
      currTime += s[i]

      continue
    }

    const char = s[i]
    switch (char) {
      case '[':
        stack.push({
          times: Number(currTime),
          s: curr,
        })

        curr = ''
        currTime = ''
        break
      case ']':
        const { s, times } = stack.pop()

        const combined = s + repeat(curr, times)

        // exist element in stack, combined needs to enter the next calculation
        if (stack[stack.length - 1]) {
          curr = combined
        } else {
          curr = ''
          ans = ans + combined
        }

        break
      default:
        curr += char
        break
    }
  }

  // plus the trailing element
  return ans + curr

  function repeat(s: string, times: number) {
    let ans = ''
    for (let i = 0; i < times; ++i) {
      ans += s
    }

    return ans
  }
}

function main() {
  // const s = '3[a]2[bc]'
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
