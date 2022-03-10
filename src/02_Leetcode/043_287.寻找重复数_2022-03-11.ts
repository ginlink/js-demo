// binary search
function findDuplicate(nums: number[]): number {
  const len = nums.length
  let l = 0,
    r = len - 1,
    ans = -1

  while (l <= r) {
    const mid = Math.floor((l + r) / 2)

    console.log('[]:', l, mid, r)

    let cnt = 0
    for (let i = 0; i < len; ++i) {
      if (nums[i] <= mid) {
        ++cnt
      }
    }

    if (cnt <= mid) {
      l = mid + 1
    } else {
      r = mid - 1
      ans = mid
    }
  }

  return ans
}

// fast and slow pointer
function findDuplicate111(nums: number[]): number {
  let slow = 0,
    fast = 0

  while (true) {
    slow = nums[slow]
    fast = nums[nums[fast]]

    if (slow === fast) {
      break
    }
  }

  let find = 0
  while (true) {
    slow = nums[slow]
    find = nums[find]

    if (slow === find) {
      break
    }
  }

  return find

  // error
  // const found = nums.find((x) => x === nums[slow])
  // return found === undefined ? -1 : nums[found]
}

function main() {
  // const nums = [1, 3, 4, 2, 2]
  // const nums = [1, 2, 4, 2, 3]
  // const nums = [1, 1]
  const nums = [2, 5, 9, 6, 9, 3, 8, 9, 7, 1]

  console.log('[]:', findDuplicate(nums))
  console.log('[]:', findDuplicate111(nums))
}

main()

export {}
