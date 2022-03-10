function findDuplicate(nums: number[]): number {
  const len = nums.length
  let l = 0,
    r = len - 1,
    ans = -1

  while (l <= r) {
    const mid = Math.floor((r + l) / 2)

    let cnt = 0
    for (let i = 0; i < len; ++i) {
      if (nums[i] <= mid) {
        ++cnt
      }
    }

    console.log('[]:', r, mid, l, cnt)
    if (cnt <= mid) {
      l = mid + 1
    } else {
      r = mid - 1
      ans = mid
    }
  }

  return ans
}

function findDuplicate111(nums: number[]): number {
  let slow = 0,
    fast = 0

  while (true) {
    slow = nums[slow]
    fast = nums[nums[fast]]

    if (fast == slow) {
      break
    }
  }

  let find = 0
  while (true) {
    find = nums[find]
    slow = nums[slow]
    if (find == slow) {
      break
    }
  }

  return find
}

function main() {
  const nums = [1, 3, 4, 2, 2]
  // const nums = [1, 2, 4, 2, 3]

  console.log('[]:', findDuplicate(nums))
  console.log('[]:', findDuplicate111(nums))
}

main()
