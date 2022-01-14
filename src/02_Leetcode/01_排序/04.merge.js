const utils = require('../common/utils')

// let arr = [1, 3, 57, 3, 2, 9, 4, 2]
function merge_do(arr) {
  let len = arr.length

  // rec(arr, 0, Math.floor((len - 1) / 2))
  rec(arr, 0, len - 1)
  function rec(arr, left, right) {
    if (left === right) return
    let mid = Math.floor((left + right) / 2)
    rec(arr, left, mid)
    rec(arr, mid + 1, right)
    merge(arr, left, mid, right)
  }
  function merge(arr, left, mid, right) {
    let i = left, j = mid + 1, len = right - left + 1, tmp = []
    while (i <= mid && j <= right) {
      let item = (arr[i] < arr[j]) ? arr[i++] : arr[j++]
      tmp.push(item)
    }
    while (i <= mid) tmp.push(arr[i++])
    while (j <= right) tmp.push(arr[j++])

    for (let k = 0; k < len; k++) {
      arr[left++] = tmp[k]
    }
  }
  return arr
}

// 最后一次复习时间：2021-5-5 07:54:15
// 最后一次复习时间：2021-5-16 12:59:15
function merge_do1(arr) {
  divide(arr, 0, arr.length - 1)

  function divide(arr, left, right) {
    if (left === right) return

    let mid;
    mid = Math.floor((left + right) / 2)
    divide(arr, left, mid)
    divide(arr, mid + 1, right)
    // 注意这里为mid+1，下一个数组
    merge(arr, left, mid, right)
  }

  function merge(arr, left, mid, right) {
    let i = left, j = mid + 1, len = right - left + 1, tmp = []
    // 第一数组左边界i，第二数组左边界j

    // 双指针遍历
    while (i <= mid && j <= right) {
      arr[i] < arr[j] ? tmp.push(arr[i++]) : tmp.push(arr[j++])
    }

    while (i <= mid) tmp.push(arr[i++])
    while (j <= right) tmp.push(arr[j++])

    i = 0
    while (i < len) arr[left++] = tmp[i++]
  }

  return arr
}

let arr = [3, 1, 57, 3, 2, 9, 4, 2, 1, 2, -1]
console.log('[merge_do]:', merge_do(utils.deep_clone1(arr)))
console.log('[merge_do1]:', merge_do1(utils.deep_clone1(arr)))
console.log('[mergeSortR]:', mergeSortR(utils.deep_clone1(arr)))

function mergeSortR(nums) {
  divide(nums, 0, nums.length - 1)
  return nums

  function divide(arr, left, right) {
    if (left == right) return

    let mid = Math.floor((left + right) / 2)
    divide(arr, left, mid)
    divide(arr, mid + 1, right)
    merge(arr, left, mid, right)
  }

  function merge(arr, left, mid, right) {
    let i = left, j = mid + 1, len = right - left + 1, tmp = []

    while (i <= mid && j <= right)
      arr[i] < arr[j] ? tmp.push(arr[i++]) : tmp.push(arr[j++])

    while (i <= mid) tmp.push(arr[i++])
    while (j <= right) tmp.push(arr[j++])

    i = 0
    while (i < len) nums[left++] = tmp[i++]
  }
}