const { swap } = require('../common/utils')
const utils = require('../common/utils')

// 第一种：冒泡法
// 难度：0颗星
// 时间复杂度O(n2)
// let arr = [1, 3, 57, 3, 2, 9, 4, 2]
function bubble(arr1) {
  // 逆序遍历
  // for (let len = arr.length, i = len - 1; i >= 0; i--) {
  //   for (let j = len - 1; j > (len - 1 - i); j--) {
  //     if (arr[j - 1] > arr[j]) {
  //       utils.swap(arr, j - 1, j)
  //     }
  //   }
  // }
  // 循序遍历
  for (let i = 0, len = arr.length; i < len - 1; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      // 思想：内部循环每次遍历都会根据大小交换相邻的元素，
      // 此时，会将最大的元素慢慢换到最后一位

      // 这里有个改进点：
      // 每次冒泡完毕，总有一个元素会变成最大的或者最小的，
      // 末尾总是有i个元素有序的
      // 也就是可以跳过这些元素，所以j<len-1-i
      if (arr[j] > arr[j + 1]) {
        utils.swap(arr, j, j + 1)
      }
    }
  }

  return arr
}

// 标准示例【复杂化了】【符合冒泡思想】
function bubble1(arr) {
  let len = arr.length
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      // for (let j = i; j < len - 1; j++) {  错误写法，
      // 因为需要反向收敛，真正排好序的是最后的元素，
      // 第一次，最大的元素到最后一个位置，
      // 第二次，第二大的元素到倒数第二个位置
      // 所以j的最大范围应该从后向前收敛，而不是从前向后收敛
      if (arr[j + 1] < arr[j]) utils.swap(arr, j, j + 1)
    }
  }
  return arr
}

// 最后一次编写时间：2021-5-2 20:37:40
// 最后一次编写时间：2021-5-16 10:36:57

// let arr = [1, 3, 57, 3, 2, 9, 4, 2]
// 注意，这种遍历的方法有点难想，建议用bubbleR的方法
// function bubble2(arr) {
//   let i = 0, j = 0, len = arr.length
//   for (; i < len; i++) {
//     // for (j = len - i; j >= 0; j--) {
//     for (j = 0; j < len - 1 - i; j++) {
//       // 注意排序是从后面向前排的
//       if (arr[j + 1] < arr[j]) {
//         utils.swap(arr, j + 1, j)
//       }
//     }
//   }
//   return arr
// }


let arr = [1, 3, 57, 3, 2, 9, 4, 2]
// arr = [1, 4, 7, 9, 2, 4, 1]
// console.log('[bubble]:', bubble(utils.deep_clone1(arr)))
// console.log('[bubble1]:', bubble1(utils.deep_clone1(arr)))
// console.log('[bubble2]:', bubble2(utils.deep_clone1(arr)))
console.log('[bubbleR]:', bubbleR(utils.deep_clone1(arr)))

// 复习：
// 2021-6-23 14:39:55
// 2021-6-25 09:53:06
function bubbleR(nums) {
  // 冒泡排序
  let i, j, len = nums.length

  for (i = 0; i < len; ++i) {
    for (j = 0; j < (len - 1) - i; ++j) {
      if (nums[j] > nums[j + 1]) swap(nums, j, j + 1)
    }
  }
  return nums
}
// function bubbleR(nums) {
//   // 写出了选择排序的感觉
//   let i = 0, j, len = nums.length

//   for (; i < len - 1; ++i) {
//     for (j = i + 1; j < len; ++j) {
//       if (nums[j] < nums[i]) swap(nums, i, j)
//     }
//   }

//   function swap(arr, i, j) {
//     let tmp = arr[i]
//     arr[i] = arr[j]
//     arr[j] = tmp
//   }

//   return nums
// }