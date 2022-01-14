// 有两个数组，一个标准数组和一个待比对数组，
// 求待比对数组未在标准数组中出现的项目，以及
// 不在标准数组中的项目

// 输入
// let std = [1,2,3,4,5]
// let arr = [1,2,3,6]
// 输出
// =>未匹配：[4,5]
// =>异常：[6]

function arrayCompare(std, arr) {
  let lenStd = std.length, i = 0, set = new Set()
  while (i < lenStd) {
    set.add(std[i++])
  }

  let j = 0, lenArr = arr.length, other = []
  while (j < lenArr) {
    if (set.has(arr[j])) {
      set.delete(arr[j++])
    } else {
      other.push(arr[j++])
    }
  }

  let noMatch = []
  set.forEach(e => noMatch.push(e))

  return {
    noMatch,
    other
  }
}


function arrayCompare1(std, arr) {
  // 算法不正确，等待
  let lenStd = std.length, lenArr = arr.length
  let flags = (new Array(lenStd)).fill(0), i = 0, j = 0

  console.log('[flags]:', flags)
  for (; i < lenArr; i++) {
    for (; j < lenStd; j++) {
      if(arr[i] === arr[j]){
        flags[j] = 0
      }
    }
  }
}


let std = [1, 2, 3, 4, 5]
let arr = [1, 2, 3, 6]
// let arr = [1, 2, 3]
console.log('[]:', arrayCompare(std, arr))