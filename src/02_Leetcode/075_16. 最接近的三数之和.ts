function threeSumClosest(nums: number[], target: number): number {
  const len = nums.length
  nums.sort((a, b) => a - b)

  let ans = Infinity,
    a = 0
  while (a < len) {
    while (a > 0 && nums[a] == nums[a - 1]) {
      ++a
    }

    let b = a + 1,
      c = len - 1
    while (b < c) {
      const sum = nums[a] + nums[b] + nums[c]

      if (sum === target) {
        return target
      }

      const diff = Math.abs(sum - target) < Math.abs(ans - target)
      ans = diff ? sum : ans

      if (sum > target) {
        --c

        while (c < len - 1 && b < c && nums[c] == nums[c + 1]) {
          --c
        }
      } else {
        ++b

        while (b > a + 1 && b < c && nums[b] == nums[b - 1]) {
          ++b
        }
      }
    }

    ++a
  }

  return ans
}

function main() {
  const nums = [-1, 2, 1, -4],
    target = 1

  console.log('[]:', threeSumClosest(nums, target))
}

main()

export {}
