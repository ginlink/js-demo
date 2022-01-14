// 部分灵感参考自：
// https://www.jianshu.com/p/f4329eb1bace


// 数组深拷贝
// 方式一：单次遍历+递归法，最直观的方式
function deep_clone1(o) {
  return rec(o)
  function rec(o){
      let tmp = []
      o.forEach(item=>{
          if(Array.isArray(item)){
              tmp.push(rec(item))
          }else{
              tmp.push(item)
          }
      })
      return tmp
  }
}

// 方法二：json法，最简单暴力的方法
// 但是无法处理undefined, function, RegExp等类型
function deep_clone2(o) {
  return JSON.parse(JSON.stringify(o))
}

let arr = [1, 2, 3, [4, 5, 6, [7, 8, 9]], 1]
// arr = [undefined, 1, 2, 3, function () { }, /123/]
// 会发现，undefined经过JSON后变成了null，函数为null，正则则变为{}
// [n]: [ null, 1, 2, 3, 999 ]
// [o]: [ undefined, 1, 2, 3, [Function (anonymous)] ]

let newArr = deep_clone1(arr)
// newArr = deep_clone2(arr)
let newArr2 = arr

// newArr[newArr.length - 1] = 999

console.log('[n]:', newArr)
console.log('[o]:', arr)
console.log('[equal1]:', newArr == arr)
console.log('[equal2]:', arr == newArr2)
// console.log('[equal2]:', newArr == newArr2)
