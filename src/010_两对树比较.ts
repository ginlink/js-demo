const origin = {
  token1: '111',
  token2: null,
}
const target = {
  token1: '222',
  token2: null,
}

function main(hg) {
  const set = new Set()

  if (!target.token1 || !target.token2) {
    const singleToken = target.token1 || target.token2

    // token不能为null
    singleToken && set.add(singleToken)
    origin.token1 && set.add(origin.token1)
    origin.token2 && set.add(origin.token2)
    if (set.size != 1) return console.log('[不匹配]:')

    console.log('[匹配单币]:', singleToken)
  } else {
    // token不能为null
    target.token1 && set.add(target.token1)
    target.token2 && set.add(target.token2)

    origin.token1 && set.add(origin.token1)
    origin.token2 && set.add(origin.token2)

    if (set.size != 2) return console.log('[不匹配]:')

    console.log('[双币]:', set)
  }
}

export {}
