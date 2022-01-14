// 题解：求两个数组的交集
// 输入：let nums1 = [1, 2, 2, 1], nums2 = [2, 2]
// 输出：[2,2]

const utils = require("./common/utils");

// 关键点：1双指针
function unite(arr1, arr2) {
  let p1 = 0, p2 = 0, tmp = []
  arr1.sort((a, b) => a - b)
  arr2.sort((a, b) => a - b)

  while (p1 < arr1.length && p2 < arr2.length) {

    if (arr1[p1] === arr2[p2]) {
      tmp.push(arr1[p1])
      p1++; p2++
    } else if (arr1[p1] < arr2[p2]) {
      p1++
    } else {
      p2++
    }
  }

  return tmp
}

// 输入：let nums1 = [1, 2, 2, 1], nums2 = [2, 2]
// 上次复习时间：2021-5-9 21:40:29
function unite22(nums1, nums2) {
  nums1.sort((a, b) => a - b)
  nums2.sort((a, b) => a - b)

  let i = 0, j = 0, len1 = nums1.length, len2 = nums2.length, tmp = []
  for (; i < len1 && j < len2;) {
    if (nums1[i] === nums2[j]) {
      tmp.push(nums1[i])
      i++; j++
    } else if (nums1[i] < nums2[j]) i++
    else j++
  }
  return tmp
}

let nums1 = [1, 2, 2, 1], nums2 = [2, 2]
// nums1 = [4, 9, 5], nums2 = [9, 4, 9, 8, 4]


console.log('[res]:', unite(utils.deep_clone1(nums1), utils.deep_clone1(nums2)))
console.log('[res]:', unite22(utils.deep_clone1(nums1), utils.deep_clone1(nums2)))