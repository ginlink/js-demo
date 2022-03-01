function main() {
  // const nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
  const nums = [5, 4, -1, 7, 8]

  console.log('[]:', maxSubArray(nums))
  console.log('[]:', maxSubArray3(nums))
}

main()

function maxSubArray(nums: number[]): number {
  let max = nums[0]
  let pre = 0

  for (let i = 0; i < nums.length; ++i) {
    pre = Math.max(pre + nums[i], nums[i])
    max = Math.max(max, pre)
  }

  return max
}

function maxSubArray2(nums: number[]): number {
  let sum = nums[0]

  for (let i = 1; i < nums.length; ++i) {
    nums[i] = Math.max(nums[i] + nums[i - 1], nums[i])
    sum = Math.max(sum, nums[i])
  }

  return sum
}

function maxSubArray3(nums: number[]): number {
  let max = -Infinity

  for (let i = 0; i < nums.length; ++i) {
    let sum = 0
    for (let j = i; j < nums.length; ++j) {
      sum += nums[j]
      max = Math.max(max, sum)
    }
  }

  return max
}
