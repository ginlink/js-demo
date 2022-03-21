function longestConsecutive(nums: number[]): number {
  const len = nums.length
  const num_set = new Set<number>()
  let max = 0
  for (let i = 0; i < len; ++i) {
    num_set.add(nums[i])
  }

  num_set.forEach((num) => {
    if (!num_set.has(num - 1)) {
      let currentNum = num
      let sum = 1 // include self
      while (num_set.has(currentNum + 1)) {
        ++currentNum
        ++sum
      }

      max = Math.max(max, sum)
    }
  })

  return max
}

function main() {
  // const nums = [100, 4, 200, 1, 3, 2]
  // const nums = [0, 3, 7, 2, 5, 8, 4, 6, 0, 1]
  const nums = [9, 1, 4, 7, 3, -1, 0, 5, 8, -1, 6]

  console.log('[]:', longestConsecutive(nums))
}

main()

export {}
