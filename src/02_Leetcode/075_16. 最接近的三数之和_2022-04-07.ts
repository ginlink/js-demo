function threeSumClosest(nums: number[], target: number): number {
  const len = nums.length
  nums.sort((a, b) => a - b)

  let i = 0,
    ans = Infinity
  while (i < len) {
    let j = i + 1,
      k = len - 1

    if (i > 0 && nums[i] == nums[i - 1]) {
      ++i
      continue
    }
    while (j < k) {
      const sum = nums[i] + nums[j] + nums[k]

      ans = Math.abs(sum - target) < Math.abs(ans - target) ? sum : ans

      if (sum < target) {
        let j0 = j + 1
        while (j0 < k && nums[j0] == nums[j0 - 1]) {
          ++j0
        }

        j = j0
      } else {
        let k0 = k - 1
        while (j < k0 && nums[k0] == nums[k0 + 1]) {
          --k0
        }

        k = k0
      }
    }

    ++i
  }

  return ans
}

function main() {
  // const nums = [-1, 2, 1, -4],
  //   target = 1
  const nums = [0, 0, 0],
    target = 1

  console.log('[]:', threeSumClosest(nums, target))
}

main()

export {}
