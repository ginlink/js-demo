function threeSum(nums: number[]): number[][] {
  const len = nums.length
  const answer: number[][] = []

  nums.sort((a, b) => a - b)

  for (let i = 0; i < len; ++i) {
    if (i > 0 && nums[i] == nums[i - 1]) {
      continue
    }

    for (let j = i + 1; j < len; ++j) {
      if (j > i + 1 && nums[j] == nums[j - 1]) {
        continue
      }

      for (let k = j + 1; k < len; ++k) {
        if (k > j + 1 && nums[k] == nums[k - 1]) {
          continue
        }

        if (nums[i] + nums[j] + nums[k] == 0) {
          answer.push([nums[i], nums[j], nums[k]])
        }
      }
    }
  }

  return answer
}
function threeSum111(nums: number[]): number[][] {
  nums.sort((a, b) => a - b)

  const len = nums.length,
    answer: number[][] = []

  if (len <= 2) {
    return []
  }

  for (let i = 0; i < len; ++i) {
    if (i > 0 && nums[i] == nums[i - 1]) {
      continue
    }

    const left = i + 1,
      right = len - 1,
      target = -nums[i]

    twoSum(nums, left, right, target, answer)
  }

  return answer

  function twoSum(nums: number[], left: number, right: number, target: number, answer: number[][]): void {
    while (left < right) {
      const sum = nums[left] + nums[right]

      if (sum == target) {
        answer.push([-target, nums[left], nums[right]])

        left++
        right--

        while (left < right && nums[left] == nums[left - 1]) {
          left++
        }
        while (left < right && nums[right] == nums[right + 1]) {
          right--
        }
      } else if (sum < target) {
        left++
      } else {
        right--
      }
    }
  }
}

function main() {
  // const nums = [-1, 0, 1, 2, -1, -4]
  // const nums = [0, 0, 0, 0, 0]
  // const nums = [0, 0]
  // const nums = [-1, 1, -1, 1]
  const nums = [-2, 0, 1, 1, 2]

  console.log('[]:', threeSum(nums))
  console.log('[]:', threeSum111(nums))
}

main()

export {}
