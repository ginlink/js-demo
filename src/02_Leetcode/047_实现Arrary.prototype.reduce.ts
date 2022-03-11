// @ts-ignore
Array.prototype.myReduce = function (fn: (prev: any, curr: any, index: number) => any, initialValue: any) {
  // @ts-ignore
  const len = this.length
  console.log('[len]:', len)

  let prev = initialValue
  for (let i = 0; i < len; ++i) {
    // @ts-ignore
    prev = fn(prev, this[i], i)
  }

  return prev
}

function main() {
  const arr = [1, 2, 3]

  // @ts-ignore
  const res = arr.myReduce((memo, curr) => {
    memo = memo + curr

    console.log('[memo]:', memo)

    return memo
  }, 0)

  console.log('[]:', res)
}

main()

export {}
