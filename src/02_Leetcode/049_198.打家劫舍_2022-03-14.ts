function rob(nums: number[]): number {
  const len = nums.length
  const dep: number[] = []

  if (len === 1) {
    return nums[0]
  } else if (len === 2) {
    return Math.max(nums[0], nums[1])
  }

  dep[0] = nums[0]
  dep[1] = Math.max(nums[0], nums[1])

  for (let i = 2; i < len; ++i) {
    dep[i] = Math.max(dep[i - 2] + nums[i], dep[i - 1])
  }

  return dep[len - 1]
}

function main() {
  // const nums = [1, 2, 3, 1]
  // const nums = [2, 7, 9, 3, 1]
  const nums = [4, 1, 2, 7, 5, 3, 1]

  console.log('[]:', rob(nums))
  // console.log('[]:', rob111(nums))
}
main()

export {}
