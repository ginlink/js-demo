export function binarySearch(nums: number[], target: number): number {
  if (nums.length <= 0 || target < nums[0] || target > nums[nums.length - 1]) {
    return -1
  }

  let left = 0,
    right = nums.length - 1

  while (left <= right) {
    const mid = Math.floor((right - left) / 2) + left

    const num = nums[mid]

    if (target == num) {
      return mid
    } else if (target > num) {
      left = mid + 1
    } else {
      right = mid - 1
    }
  }

  return -(left + 1)
}

function main() {
  const nums = [1, 3, 4, 5, 9]
  const target = 8

  console.log('[]:', binarySearch(nums, target))
}

// main()

export {}
