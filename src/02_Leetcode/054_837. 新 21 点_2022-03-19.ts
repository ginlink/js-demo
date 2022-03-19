function new21Game(n: number, k: number, maxPts: number): number {
  const dp = new Array(k + maxPts).fill(0)

  let minLen = Math.min(n + 1, k + maxPts)
  for (let i = 0; i < minLen; ++i) {
    dp[i] = 1
  }

  let s = Math.min(n - k + 1, maxPts)
  for (let i = k - 1; i >= 0; --i) {
    dp[i] = s / maxPts

    s += dp[i] - dp[i + maxPts]
  }

  return dp[0]
}

function main() {
  // const n = 10,
  //   k = 1,
  //   maxPts = 10
  const n = 2,
    k = 2,
    maxPts = 3

  console.log('[]:', new21Game(n, k, maxPts))
}
main()

export {}
