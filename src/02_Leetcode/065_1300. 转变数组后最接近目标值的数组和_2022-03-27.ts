function findBestValue(arr: number[], target: number): number {
  arr.sort((a, b) => a - b)

  const len = arr.length

  const prefix = new Array(len + 1).fill(0)
  for (let i = 1; i <= len; ++i) {
    prefix[i] = prefix[i - 1] + arr[i - 1]
  }

  const max = arr[len - 1]
  let answer = 0,
    diff = target
  for (let i = 1; i <= max; ++i) {
    let index = binarySearch(arr, i)

    if (index < 0) {
      index = -(index + 1)
    }

    const sum = prefix[index] + (len - index) * i
    const curr = Math.abs(sum - target)

    if (curr < diff) {
      diff = curr
      answer = i
    }
  }

  return answer

  function binarySearch(nums: number[], target: number): number {
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
}

function main() {
  // const arr = [4, 9, 3],
  //   target = 10
  // const arr = [2, 3, 5],
  //   target = 10
  const arr = [60864, 25176, 27249, 21296, 20204],
    target = 56803

  // [ 20204, 21296, 25176, 27249, 60864 ]

  console.log('[]:', findBestValue(arr, target))
}

main()

export {}
