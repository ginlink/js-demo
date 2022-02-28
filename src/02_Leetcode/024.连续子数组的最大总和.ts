function main() {
  const arr = [100, 200, 300, 400, 500, 100]
  const k = 2

  console.log('[]:', maxSum(arr, k))
}

main()

function maxSum(arr: number[], k: number): number {
  let maxSum = 0
  const len = arr.length

  if (len < k) return -1

  for (let i = 0; i < k; ++i) {
    maxSum += arr[i]
  }

  for (let i = k; i < len; ++i) {
    const sum = maxSum + arr[i] - arr[i - k]
    maxSum = Math.max(maxSum, sum)
  }

  return maxSum
}
