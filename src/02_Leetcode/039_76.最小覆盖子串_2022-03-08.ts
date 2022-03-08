export function minWindow(s: string, t: string): string {
  const sLen = s.length
  const tLen = t.length

  const ori = new Map<string, number>()
  const cnt = new Map<string, number>()

  for (let i = 0; i < tLen; ++i) {
    const key = t.charAt(i)
    ori.set(key, ori.get(key) ? ori.get(key) + 1 : 1)
  }

  let l = 0,
    r = -1

  let len = Infinity,
    ansL = -1,
    ansR = -1

  while (r < sLen) {
    ++r

    // move right pointer
    // expand the range
    const key = s.charAt(r)
    if (r < sLen && ori.has(key)) {
      cnt.set(key, cnt.get(key) ? cnt.get(key) + 1 : 1)
    }

    // move left pointer
    while (check() && l <= r) {
      const key = s.charAt(l)

      // compute ans
      if (r - l + 1 < len) {
        len = r - l + 1
        ansL = l
        ansR = l + len
      }

      // narrow the range
      if (ori.has(key)) {
        cnt.set(key, cnt.get(key) ? cnt.get(key) - 1 : -1)
      }

      ++l
    }
  }

  return ansL == -1 ? '' : s.slice(ansL, ansR)

  function check() {
    let res = true

    // cnt's all value must greater or equal ori's values
    // the `value` refers number of occurrences
    ori.forEach((val, key) => {
      const newVal = cnt.get(key) || -1

      if (newVal < val) return (res = false)
    })

    return res
  }
}

function main() {
  const s = 'ADOBECODEBANC'
  const t = 'ABC'

  console.log('[]:', minWindow(s, t))
}

main()
