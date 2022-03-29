function maxScoreSightseeingPair(values: number[]): number {
  let len = values.length,
    mx = 0,
    ans = 0
  for (let i = 0; i < len; ++i) {
    ans = Math.max(ans, mx + values[i] - i)

    mx = Math.max(mx, values[i] + i)
  }

  return ans
}

function main() {
  // const values = [8, 1, 5, 2, 6]
  const values = [1, 2]

  console.log('[]:', maxScoreSightseeingPair(values))
}

main()

export {}
