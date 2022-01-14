/**
 * let nums1 = [1, 2, 3, 98, 0, 0, 0], m = 3,
  nums2 = [2, 5, 6, 7, 9, 10], n = 6
  m,n为元素个数，根据m,n的量去合并两个数组。
  前提是两个数组本身是有序的
 */



// 难度：*
// 方法一：直接合并后排序
function merge1(nums1, m, nums2, n) {
  nums1.splice(m, nums1.length - m, ...nums2)
  nums1.sort((a, b) => a - b)
  return nums1
}


// 方法二：双指针法
var merge2 = function (nums1, m, nums2, n) {
  let tmp = []
  let p1 = 0, p2 = 0;

  while (p1 < m && p2 < n) {
    if (nums1[p1] < nums2[p2]) {
      tmp.push(nums1[p1])
      p1++
    }
    else {
      tmp.push(nums2[p2])
      p2++
    }
  }

  // 追加剩余的
  if (p1 < m) tmp.push(...nums1.slice(p1, m))
  if (p2 < n) tmp.push(...nums2.slice(p2, n))


  nums1 = tmp

  return nums1
};

// 方法二的双指针法省空间的写法：
function merge22(nums1, m, nums2, n) {
  let tmp = []
  for (let i = 0, j = 0; i < m || j < n;) {
    let item;

    if (i === m) {
      item = nums2[j++]
    } else if (j === n) {
      item = nums1[i++]
    } else if (nums1[i] < nums2[j]) {
      item = nums1[i++]
    } else {
      item = nums2[j++]
    }

    tmp.push(item)
  }

  return tmp
}

// 双指针
// 最后一次复习时间：2021-5-9 20:02:09
// let nums1 = [1, 2, 3, 98, 0, 0, 0], m = 3,
//  nums2 = [2, 5, 6, 7, 9, 10], n = 6
function merge22(nums1, m, nums2, n) {
  let tmp = [], i = 0, j = 0
  while (i < m || j < n) {
    let item;
    if (i === m) item = nums2[j++]
    else if (j === n) item = nums1[i++]
    else if (nums1[i] < nums2[j]) item = nums1[i++]
    else item = nums2[j++]

    tmp.push(item)
  }

  i = 0
  for (; i < tmp.length; i++) nums1[i] = tmp[i]

  return nums1
}


// 方法三：逆向双指针法(特殊情况，未看懂解法，暂时放弃)
// function merge2(nums1, m, nums2, n) {
//   let p1 = m, p2 = n

//   while (p1 >=0 && p2 >= 0) {
//     if (nums1[p1] < nums2[p2]) {
//       nums1[p1+1] = nums2[p2]
//       p1--
//     }else{
//       p2--
//     }
//   }

//   // 追加剩余的
//   // if (p1 >0) nums1.push(...nums1.slice(p1, m))
//   if (p2 >0) nums1.push(...nums2.slice(p2, n))
// }
var merge4 = function (nums1, m, nums2, n) {
  let p1 = m - 1, p2 = n - 1;
  let tail = m + n - 1;
  var cur;
  while (p1 >= 0 || p2 >= 0) {
    if (p1 === -1) {
      cur = nums2[p2--];
    } else if (p2 === -1) {
      cur = nums1[p1--];
    } else if (nums1[p1] > nums2[p2]) {
      cur = nums1[p1--];
    } else {
      cur = nums2[p2--];
    }
    nums1[tail--] = cur;
  }

  return nums1
};

let nums1 = [1, 2, 3, 98, 0, 0, 0], m = 4, nums2 = [2, 5, 6, 7, 9, 10], n = 6
// m = 101, nums1 = createArr(m),
// n = 10, nums2 = createArr(n)

// console.log('[res1]:', merge1(JSON.parse(JSON.stringify(nums1)), m, JSON.parse(JSON.stringify(nums2)), n).length)
// console.log('[res2]:', merge2(nums1, m, nums2, n).length)
// console.log('[res22]:', merge22(nums1, m, nums2, n).length)
console.log('[res22]:', merge22(nums1, m, nums2, n))

// console.time('res1')
// merge1(JSON.parse(JSON.stringify(nums1)), m, JSON.parse(JSON.stringify(nums2)), n)
// console.timeEnd('res1')

// console.time('res2')
// merge2(JSON.parse(JSON.stringify(nums1)), m, JSON.parse(JSON.stringify(nums2)), n)
// merge2(nums1, m, nums2, n)
// merge2(JSON.parse(JSON.stringify(nums1)), m, JSON.parse(JSON.stringify(nums2)), n)
// console.timeEnd('res2')

// console.time('res4')
// merge4(nums1, m, nums2, n)
// console.timeEnd('res4')

function createArr(num = 100) {
  let tmp = []
  for (let i = 0; i < num; i++) {

    let item = Math.floor(Math.random() * 100)
    tmp.push(item)
  }

  return tmp
}

let arr1 = [1, 2, 3, 4, 5], arr2 = [2, 3, 4, 5, 6]
console.log('[mergeArrayR]:', mergeArrayR(arr1, arr2))
console.log('[mergeArrayR2]:', mergeArrayR2(arr1, arr2))

function mergeArrayR(arr1, arr2) {
  // 更加清晰，比方法二
  let i = 0, j = 0, lenI = arr1.length, lenJ = arr2.length
  // let res = Array(lenI+lenJ)
  let res = []

  while (i < lenI && j < lenJ) arr1[i] < arr2[j] ? res.push(arr1[i++]) : res.push(arr2[j++])
  while (i < lenI) res.push(arr1[i++])
  while (j < lenJ) res.push(arr2[j++])

  return res
}
function mergeArrayR2(arr1, arr2) {
  // 方法二：一遍循环法
  let i = 0, j = 0, lenI = arr1.length, lenJ = arr2.length
  // let res = Array(lenI+lenJ)
  let res = []

  while (i < lenI || j < lenJ) {
    let item;
    if (i == lenI) item = arr2[j++]
    else if (j == lenJ) item = arr1[i++]
    else if (arr1[i] < arr2[j]) item = arr1[i++]
    else item = arr2[j++]

    res.push(item)
  }

  return res
}