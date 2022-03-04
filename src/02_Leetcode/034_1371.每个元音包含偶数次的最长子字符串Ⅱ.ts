enum NumType {
  EVEN = '1',
  ODD = '2',
}

class Status {
  private status: {
    [key: string]: NumType
  } = {
    a: NumType.EVEN,
    e: NumType.EVEN,
    i: NumType.EVEN,
    o: NumType.EVEN,
    u: NumType.EVEN,
  }

  invert(who: 'a' | 'e' | 'i' | 'o' | 'u') {
    this.status[who] = this.status[who] == NumType.EVEN ? NumType.ODD : NumType.EVEN
  }

  toString() {
    return Object.keys(this.status)
      .map((key) => key + this.status[key])
      .join('')
  }

  isEqual(newState: { [key: string]: NumType }) {
    const state = this.status
    const keys = Object.keys(state)

    for (let i = 0; i < keys.length; ++i) {
      if (state[i] != newState[i]) return false
    }

    return true

    // return (
    //   state.a == newState.a &&
    //   state.e == newState.e &&
    //   state.i == newState.i &&
    //   state.o == newState.o &&
    //   state.u == newState.u
    // )
  }
}

function main() {
  // const s = 'eleetminicoworoep'
  // const s = 'leetcodeisgreat'
  const s = 'bcbcbc'

  console.log('[]:', findTheLongestSubstring(s))
  // console.log('[]:', findTheLongestSubstring111(s))
  console.log('[]:', findTheLongestSubstring222(s))
}

main()

function findTheLongestSubstring(s: string): number {
  const len = s.length

  let max = ''
  let evenMap: { [key: string]: number } = {}

  for (let i = 1; i < len; ++i) {
    let current = ''
    resetMap()

    for (let j = i; j >= 0; --j) {
      current = s[j] + current

      if (evenMap[s[j]] != undefined) {
        ++evenMap[s[j]]
      }

      if (isEven() && current.length >= max.length) {
        max = current
      }
    }
  }

  return max.length

  function isEven(): boolean {
    return Object.values(evenMap).every((x) => x % 2 == 0)
  }

  function resetMap() {
    evenMap = {
      a: 0,
      e: 0,
      i: 0,
      o: 0,
      u: 0,
    }
  }
}

function findTheLongestSubstring111(s: string): number {
  const len = s.length

  let res = -Infinity
  // let pre: {
  //   [key: number]: NumType
  // } = {}

  let pre: { [key: number]: NumType } = new Array(len).fill({
    a: NumType.EVEN,
    e: NumType.EVEN,
    i: NumType.EVEN,
    o: NumType.EVEN,
    u: NumType.EVEN,
  })

  for (let i = 1; i < len; ++i) {
    let char = s.charAt(i)

    if (char == 'a') {
      pre[i]['a'] = pre[i]['a'] == NumType.EVEN ? NumType.ODD : NumType.EVEN
    } else if (char == 'e') {
      pre[i]['e'] = pre[i]['e'] == NumType.EVEN ? NumType.ODD : NumType.EVEN
    } else if (char == 'i') {
      pre[i]['i'] = pre[i]['i'] == NumType.EVEN ? NumType.ODD : NumType.EVEN
    } else if (char == 'o') {
      pre[i]['o'] = pre[i]['o'] == NumType.EVEN ? NumType.ODD : NumType.EVEN
    } else if (char == 'u') {
      pre[i]['u'] = pre[i]['u'] == NumType.EVEN ? NumType.ODD : NumType.EVEN
    }

    if (
      pre[i]['a'] == pre[i - 1]['a'] ||
      pre[i]['a'] == pre[i - 1]['a'] ||
      pre[i]['a'] == pre[i - 1]['a'] ||
      pre[i]['a'] == pre[i - 1]['a'] ||
      pre[i]['a'] == pre[i - 1]['a']
    ) {
      // res =
    }
    console.log('[pre]:', pre)
  }

  return res
}

function findTheLongestSubstring222(s: string): number {
  const len = s.length

  let res = 0
  const map = new Map<string, number>()
  const currStatus = new Status()

  map.set(currStatus.toString(), -1)

  for (let i = 0; i < len; ++i) {
    const char = s.charAt(i)

    if (char == 'a') {
      currStatus.invert('a')
    } else if (char == 'e') {
      currStatus.invert('e')
    } else if (char == 'i') {
      currStatus.invert('i')
    } else if (char == 'o') {
      currStatus.invert('o')
    } else if (char == 'u') {
      currStatus.invert('u')
    }

    // use status's string as key
    const currKey = currStatus.toString()

    if (map.has(currKey)) {
      res = Math.max(res, i - map.get(currKey))
    } else {
      map.set(currKey, i)
    }
  }

  return res
}
