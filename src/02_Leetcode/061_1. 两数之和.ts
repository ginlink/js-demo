function twoSum(nums: number[], target: number): number[] {
  const len = nums.length
  const map = new Map<number, number>()

  for (let i = 0; i < len; ++i) {
    map.set(target - nums[i], i)
  }

  for (let i = 0; i < len; ++i) {
    const key = map.get(nums[i])
    if (map.has(nums[i]) && key != i) {
      return [i, key]
    }
  }

  return []
}

function main() {
  // const nums = [2, 7, 11, 15],
  //   target = 9

  const nums = [3, 2, 4],
    target = 6

  console.log('[]:', twoSum(nums, target))
}

main()

export {}
