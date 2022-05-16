// 双指针法
// 两数之和不能使用双指针，因为要返回索引
// 双指针依赖排序，而排序会打乱索引
function twoSum(nums: number[], target: number): number[] {
  const len = nums.length

  nums.sort((a, b) => a - b)

  let i = 0,
    j = len - 1

  while (i < j) {
    const a = nums[i]
    const b = nums[j]
    const c = a + b

    if (c === target) {
      return [i, j]
    } else if (c < target) {
      ++i
    } else {
      --j
    }
  }

  return []
}

// 哈希表法
function twoSumDict(nums: number[], target: number): number[] {
  const map = new Map<number, number>()
  const len = nums.length

  for (let i = 0; i < len; ++i) {
    map.set(nums[i], i)
  }

  for (let i = 0; i < len; ++i) {
    const matched = map.get(target - nums[i])
    if (matched && matched !== i) {
      return [i, map.get(target - nums[i])]
    }
  }

  return []
}

// 穷举法
function twoSumExhaustion(nums: number[], target: number): number[] {
  const len = nums.length

  for (let i = 0; i < len; ++i) {
    for (let j = i + 1; j < len; ++j) {
      const a = nums[i],
        b = nums[j]
      if (a + b === target) {
        return [i, j]
      }
    }
  }

  return []
}

function main() {
  // const nums = [2, 7, 11, 15],
  //   target = 9

  const nums = [3, 2, 4],
    target = 6

  // console.log('[]:', twoSum(nums, target))
  console.log('[]:', twoSumDict(nums, target))
  console.log('[]:', twoSumExhaustion(nums, target))
}

main()

export {}
