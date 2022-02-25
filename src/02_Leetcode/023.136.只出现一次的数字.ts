function main() {
  // const arr = [2, 2, 1]
  const arr = [4, 1, 2, 1, 2]
  console.log('[singleNumber]:', singleNumber(arr))
}

main()

function singleNumber(arr: number[]): number {
  let res = 0
  for (let i = 0; i < arr.length; ++i) {
    res ^= arr[i]
  }

  return res
}
