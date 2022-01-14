
function average(nums) {
  // 排序法：O(nlogn)
  nums.sort((a, b) => a - b)
  nums.shift(); nums.pop();
  return nums.reduce((prev, curr) => prev + curr) / nums.length
}

function averageFind(nums) {
  // 查找法
  let i, len = nums.length

  if (len <= 2) return 0

  let max = 0, min = 0
  for (i = 0; i < len; ++i) {
    if (nums[i] < nums[min]) min = i
    if (nums[max] < nums[i]) max = i
  }
  console.log('[max]:', max)
  console.log('[min]:', min)

  nums.splice(max, 1); nums.splice(min, 1)
  return nums.reduce((prev, curr) => prev + curr) / nums.length
}

let arr = [8, 9, 8, 7, 5, 9, 10, 9]
// console.log('[]:', average(arr))
console.log('[]:', averageFind(arr))