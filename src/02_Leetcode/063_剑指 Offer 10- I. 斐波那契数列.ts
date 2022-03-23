function fib(n: number): number {
  if (n == 0 || n == 1) {
    return n
  }

  return (fib(n - 1) + fib(n - 2)) % (1e9 + 7)
}

function fib111(n: number): number {
  const dp: number[] = new Array(n + 1)

  dp[0] = 0
  dp[1] = 1

  for (let i = 2; i <= n; ++i) {
    dp[i] = (dp[i - 1] + dp[i - 2]) % (1e9 + 7)
  }

  return dp[n]
}

function main() {
  // const n = 2
  // const n = 5
  // const n = 19
  // const n = 39
  const n = 45000000

  // console.log('[]:', fib(n))
  console.log('[]:', fib111(n))
}

main()

export {}
