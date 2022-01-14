const utils = require('../common/utils')

// let arr = [1, 3, 57, 3, 2, 9, 4, 2]
function select(arr) {
  let max, len = arr.length
  for (let i = len - 1; i > 0; i--) {
    // 注意i的临界值，她的范围应该小于j的范围，
    // 因为j=i-1 她要保证j的安全
    max = i
    for (let j = i - 1; j >= 0; j--) {
      if (arr[max] < arr[j]) max = j
    }

    if (max !== i) utils.swap(arr, i, max)
  }
  return arr
}

// 最后一次编辑时间：2021-5-16 10:51:10
function select2(arr) {
  let i = 0, j = 0, len = arr.length

  for (; i < len; i++) {
    let min = i
    for (j = i + 1; j < len; j++) {
      if (arr[j] < arr[min]) {
        min = j
        // break 注意这里不能break跳出，因为
        // 不完全，当前找到的并不是最小值
      }
    }
    if (min !== i) swap(arr, min, i)
  }
  return arr

  function swap(arr, i, j) {
    let tmp = arr[i]
    arr[i] = arr[j]
    arr[j] = tmp
  }
}


let arr = [1, 3, 57, 3, 2, 9, 4, 2, 1]
// console.log('[select]:', select(utils.deep_clone1(arr)))
console.log('[select2]:', select2(utils.deep_clone1(arr)))
console.log('[selectR]:', selectR(utils.deep_clone1(arr)))

// 复习：2021-6-24 11:30:27
function selectR(nums) {
  // 选择排序
  let i, j, len = nums.length

  for (i = 0; i < len - 1; ++i) {
    let min = i
    for (j = i + 1; j < len; ++j) {
      if (nums[j] < nums[min]) {
        min = j
      }
    }
    // console.log('[]:', i, min)
    // if (min != i) utils.swap(nums, i, min)
    if (min != i) swap(nums, min, i)
  }

  return nums
}

function swap(arr, i, j) {
  let tmp = arr[i]
  arr[i] = arr[j]
  arr[j] = tmp
}