const utils = require('../common/utils')

// let arr = [1, 3, 57, 3, 2, 9, 4, 2]
function insert(arr) {
  let get, j, len = arr.length
  for (let i = 1; i < len; i++) {
    get = arr[i]
    j = i - 1

    while (j >= 0 && get < arr[j]) {
      utils.swap(arr, j + 1, j)
      j--
    }

    if (j !== i - 1) arr[j + 1] = get
  }
  return arr
}

// 最后一次更新时间：2021-5-16 12:58:42
function insert1(arr) {
  let i = 0, j, len = arr.length, get

  for (; i < len - 1; i++) {
    j = i + 1
    get = arr[i + 1]

    while (j > 0 && get < arr[j - 1]) {
      arr[j] = arr[j - 1]
      j--
    }
    if (j !== (i + 1)) arr[j] = get
    // j一直挪动，j最后的位置就是插入元素的位置
  }
  return arr
}


let arr = [3, 1, 57, 3, 2, 9, 4, 2, 1, 2]
console.log('[原数组]:', arr)
console.log('[insert]:', insert(utils.deep_clone1(arr)))
console.log('[insert1]:', insert1(utils.deep_clone1(arr)))
console.log('[insertR]:', insertR(utils.deep_clone1(arr)))

function insertR(nums) {
  let i, j, get, len = nums.length

  for (i = 1; i < len; ++i) {
    j = i

    if (nums[j] > nums[j - 1]) continue // 当前元素比上一个元素大，就跳过
    get = nums[j]

    while (j > 0 && get < nums[j - 1]) {
      nums[j] = nums[j - 1]
      j--
    }

    nums[j] = get
  }
  return nums
}