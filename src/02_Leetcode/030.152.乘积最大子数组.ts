function main() {
  // const nums = [2, 3, -2, 4]
  // const nums = [-2, 0, -1]
  // const nums = []
  // const nums = [-2]
  const nums = [-3, 0, 1, -2]

  console.log('[]:', maxProduct(nums))
  console.log('[]:', maxProduct111(nums))
}

main()

function maxProduct(nums: number[]): number {
  let res = -Infinity

  for (let i = 0; i < nums.length; ++i) {
    let mul = nums[i]
    res = Math.max(res, mul)

    for (let j = i + 1; j < nums.length; ++j) {
      mul *= nums[j]

      res = Math.max(res, mul)
    }
  }

  return res == -Infinity ? undefined : res
}

function maxProduct111(nums: number[]): number {
  const len = nums.length
  const maxF = new Array(len).fill(0)
  const minF = new Array(len).fill(0)

  maxF[0] = nums[0]
  minF[0] = nums[0]

  for (let i = 1; i < len; ++i) {
    maxF[i] = Math.max(maxF[i - 1] * nums[i], Math.max(minF[i - 1] * nums[i], nums[i]))
    minF[i] = Math.min(minF[i - 1] * nums[i], Math.min(maxF[i - 1] * nums[i], nums[i]))
  }

  let res = maxF[0]
  for (let i = 1; i < len; ++i) {
    res = Math.max(res, maxF[i])
  }

  return res
}
