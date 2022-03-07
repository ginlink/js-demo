function minWindow(s: string, t: string): string {
  const ori = new Map<string, number>()
  const cnt = new Map<string, number>()

  const tLen = t.length
  const sLen = s.length

  for (let i = 0; i < tLen; ++i) {
    const val = t.charAt(i)
    ori.set(val, ori.get(val) ? ori.get(val) + 1 : 1)
  }

  let l = 0,
    r = -1
  let len = Infinity,
    ansL = -1,
    ansR = -1

  while (r < sLen) {
    ++r

    const val = s.charAt(r)
    if (r < sLen && ori.has(val)) {
      cnt.set(val, cnt.get(val) ? cnt.get(val) + 1 : 1)
    }

    while (check() && l <= r) {
      if (r - l + 1 < len) {
        len = r - l + 1
        ansL = l
        ansR = l + len
      }

      const val = s.charAt(l)
      if (ori.has(val)) {
        cnt.set(val, cnt.get(val) ? cnt.get(val) - 1 : -1)
      }

      ++l
    }
  }

  return len == Infinity ? '' : s.slice(ansL, ansR)

  function check() {
    let res = true
    ori.forEach((val, key) => {
      const cntVal = cnt.get(key) || 0
      if (cntVal < val) {
        return (res = false)
      }
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
