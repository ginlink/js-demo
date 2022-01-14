// 第一种：冒泡法
// 难度：0颗星
// 时间复杂度O(n2)
// let arr = [1, 3, 57, 3, 2, 9, 4, 2]
function bubble(arr1) {
  let arr = deep_clone1(arr1)

  // 逆序遍历
  // for (let len = arr.length, i = len - 1; i >= 0; i--) {
  //   for (let j = len - 1; j > (len - 1 - i); j--) {
  //     if (arr[j - 1] > arr[j]) {
  //       swap(arr, j - 1, j)
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
        swap(arr, j, j + 1)
      }
    }
  }

  return arr
}

// 第二种：选择排序
function select(arr1) {
  let arr = deep_clone1(arr1)

  for (let i = 0, len = arr.length; i < len; i++) {
    // 思路：选择最大(小)元素，并将其和最前端元素交换
    // 也就是前端的元素已经排好序了，从后面无序的元素中选择
    // 需要的最大(小)元素

    let min = i  // 前面i个都已经有序了
    for (let j = i + 1; j < len; j++) {  // 无序
      // 找寻最小元素
      if (arr[j] < arr[min]) {
        min = j
      }
    }
    if (min != i) swap(arr, i, min)
  }

  return arr
}

// 堆排序，堆排序属于选择排序
// https://www.cnblogs.com/chengxiao/p/6129630.html
// 需要树的基础，完全二叉树被看做数组来操作

// 第三种：插入法
// let arr = [1, 3, 57, 3, 2, 9, 4, 2]
function insert(arr1) {
  let arr = deep_clone1(arr1)
  for (let len = arr.length, i = 1; i < len; i++) {
    // 思路：与打牌相似，拿到牌之后想办法插入到指定位置，
    // 这里比较特殊，因为在同一个数组之中操作，那么需要
    // 挪动位置，比较巧妙

    let get = arr[i]
    let j = i - 1
    while (j >= 0 && get < arr[j]) {
      // 挪动位置，让拿到的新牌有地方可以放
      // 但是有一个问题，j+1的位置被占了，那么该元素去哪里了？
      // 在get中存着，这里比较巧，只有两种情况
      // 第一：如果此循环进不来，则j+1=i
      // 第二：如果此循环进来了，那么j+1还是=i
      // 无论哪种情况，最后get的值都会被赋给j+1

      arr[j + 1] = arr[j]
      j--
    }
    // 这里j+1是因为上面多减了
    arr[j + 1] = get
  }
  return arr
}

// 第四种：归并法
function merge_sort(arr) {
  rec(arr, 0, arr.length - 1)

  function rec(arr, left, right) {
    if (left === right) return
    let mid = Math.floor((left + right) / 2)
    rec(arr, left, mid)
    rec(arr, mid + 1, right)
    merge(arr, left, mid, right)
  }

  function merge(arr, left, mid, right) {
    let i = left, j = mid + 1, len = right - left + 1, tmp = []
    // i,j为两个数组的边界

    while (i <= mid && j <= right) {
      let item;
      item = (arr[i] <= arr[j]) ? arr[i++] : arr[j++]
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

let arr = [1, 3, 57, 3, 2, 9, 4, 2]
console.log('[bubble]:', bubble(arr))
console.log('[select]:', select(arr))
console.log('[insert]:', insert(arr))
console.log('[merge_sort]:', merge_sort(arr))

// 交换算法
function swap(arr, a, b) {
  let tmp = arr[b]
  arr[b] = arr[a]
  arr[a] = tmp
}
// 适应深拷贝
function deep_clone1(o) {
  return rec(o)
  function rec(o) {
    if (typeof (o) !== 'object' || o === null || o === undefined || typeof (o) === 'function') return o

    if (o instanceof Array) {
      let tmp = []
      o.forEach(item => {
        tmp.push(rec(item))
      })

      return tmp
    } else if (o instanceof Object) {
      // 遍历类，这里要注意reg类型
      if (o instanceof RegExp) return o
      else {
        let obj = {}
        let keys = Object.keys(o)
        for (let i = 0; i < keys.length; i++) {
          obj[keys[i]] = rec(o[keys[i]])
        }
        return obj
      }
    }
  }
}
