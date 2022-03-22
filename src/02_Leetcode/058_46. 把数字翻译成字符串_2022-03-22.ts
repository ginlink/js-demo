function translateNum(num: number): number {
  const numStr = num.toString()
  const len = numStr.length
  const dp: number[] = []

  // dp[i] represents all possible translations from [0, ...i)
  dp[0] = 1
  dp[1] = 1

  for (let i = 1; i < len; ++i) {
    // Previous one number
    dp[i + 1] = dp[i]

    // Previous two number
    const curr = Number(numStr.slice(i - 1, i + 1))
    if (curr >= 10 && curr <= 25) {
      // dp[i] is previous one number
      // dp[i - 1] is previous two number
      dp[i + 1] = dp[i] + dp[i - 1]
    }
  }

  return dp[len]
}

function main() {
  const num = 12258

  console.log('[]:', translateNum(num))
}

main()

export {}
