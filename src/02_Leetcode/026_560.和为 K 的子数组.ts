function main() {
  // const nums = [1, 1, 1]
  // const nums = [1, 2, 3]
  // const nums = [1]
  const nums = [1, -1, 0]
  const k = 0

  console.log('[]:', subarraySum(nums, k))
  console.log('[]:', subarraySum2(nums, k))
}

main()

function subarraySum(nums: number[], k: number): number {
  let res = 0
  const len = nums.length

  for (let left = 0; left < len; ++left) {
    let sum = 0
    for (let right = left; right < len; ++right) {
      sum += nums[right]

      if (sum === k) {
        ++res
      }

      // can not continue, because the next element maybe 0 or negative number
      // continue
      // } else if (sum > k) {
      //   continue
      // }
    }
  }

  return res
}

function subarraySum2(nums: number[], k: number): number {
  let count = 0
  let pre = 0
  const len = nums.length
  const map = new Map<number, number>()

  map.set(pre, 1)

  for (let i = 0; i < len; ++i) {
    pre += nums[i]

    // console.log('[map]:', map)
    // console.log('[pre]:', pre)

    // map's elment is [j...i-1]
    // so it must be ahead of map.set
    let exist0 = map.get(pre - k)
    if (exist0) {
      count += exist0
    }

    // maintain the pre map
    let exist1 = map.get(pre)
    if (exist1) {
      map.set(pre, ++exist1)
    } else {
      map.set(pre, 1)
    }
  }

  return count
}
