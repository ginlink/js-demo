function productExceptSelf(nums: number[]): number[] {
  const len = nums.length,
    L: number[] = [],
    R: number[] = [],
    answer: number[] = []

  L[0] = 1
  for (let i = 1; i < len; ++i) {
    L[i] = nums[i - 1] * L[i - 1]
  }
  R[len - 1] = 1
  for (let i = len - 1 - 1; i >= 0; --i) {
    R[i] = nums[i + 1] * R[i + 1]
  }

  for (let i = 0; i < len; ++i) {
    answer[i] = L[i] * R[i]
  }

  return answer
}
function productExceptSelf111(nums: number[]): number[] {
  const len = nums.length,
    answer: number[] = []

  answer[0] = 1
  for (let i = 1; i < len; ++i) {
    answer[i] = nums[i - 1] * answer[i - 1]
  }

  let R = 1
  for (let i = len - 1; i >= 0; --i) {
    answer[i] = answer[i] * R

    R *= nums[i]
  }

  return answer
}

function main() {
  const nums = [1, 2, 3, 4]

  console.log('[]:', productExceptSelf(nums))
  console.log('[]:', productExceptSelf111(nums))
}

main()

export {}
