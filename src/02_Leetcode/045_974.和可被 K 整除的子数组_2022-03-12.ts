function subarrayDivByK(nums: number[], k: number): number {
  const len = nums.length
  let sum = 0,
    ans = 0
  const map = new Map<number, number>()

  map.set(0, 1)

  for (let i = 0; i < len; ++i) {
    sum += nums[i]

    const mod = ((sum % k) + k) % k

    const same = map.get(mod) ?? 0

    ans += same

    map.set(mod, same + 1)
  }

  return ans
}

function main() {
  const nums = [4, 5, 0, -2, -3, 1]
  const k = 5

  console.log('[]:', subarrayDivByK(nums, k))
}
main()

export {}
