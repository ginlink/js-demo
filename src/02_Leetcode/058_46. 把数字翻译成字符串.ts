function translateNum(num: number): number {
  const numStr = num.toString()
  const len = numStr.length
  const dp: number[] = new Array(len + 1)

  dp[0] = 1
  dp[1] = 1

  for (let i = 1; i < len; ++i) {
    dp[i + 1] = dp[i]

    const code = Number(numStr.slice(i - 1, i + 1))
    if (code >= 10 && code <= 25) {
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
