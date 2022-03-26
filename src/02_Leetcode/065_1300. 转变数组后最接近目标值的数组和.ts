function findBestValue(arr: number[], target: number): number {
  arr.sort((a, b) => a - b)

  // console.log('[arr]:', arr)

  const len = arr.length
  const prefix: number[] = new Array(len + 1).fill(0)

  for (let i = 1; i <= len; ++i) {
    prefix[i] = prefix[i - 1] + arr[i - 1]
  }

  // console.log('[prefix]:', prefix)

  let ans = 0,
    diff = target,
    max = arr[len - 1]

  for (let i = 1; i <= max; ++i) {
    let index = binarySearch(arr, i)

    // console.log('[index111]:', index)

    if (index < 0) {
      index = -index - 1
    }

    const sum = prefix[index] + (len - index) * i
    const curr = Math.abs(sum - target)

    // console.log('[diff]:', diff, prefix[index], index, i, sum, curr)

    if (curr < diff) {
      ans = i
      diff = curr
    }
  }

  return ans

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
  // const arr = [60864, 25176, 27249, 21296, 20204],
  // target = 56803

  // [ 20204, 21296, 25176, 27249, 60864 ]

  console.log('[]:', findBestValue(arr, target))
}

main()

export {}
