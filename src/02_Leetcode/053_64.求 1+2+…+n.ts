function sumNums(n: number): number {
  // can not use `if`
  // if (n <= 0) {
  //   return 0
  // }

  // if `0` return `0`, because blocked
  return n && n + sumNums(--n)
}

function main() {
  // const n = 3
  const n = 9

  console.log('[]:', sumNums(n))
}

main()
