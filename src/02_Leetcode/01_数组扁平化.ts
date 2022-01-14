// 题目：
// 有一个数组[1,2,[3,4],[5,6,[7,8,[9]]]]
// 请将她转化为[1,2,3,4,5,6,7,8,9]
// 难度：*


// 方法一：使用toString
// 原理：数组拆箱，例如：[1,2,[3,4,5]].toString()
// 弊端：原来数据类型不能够被保留
// => '1,2,3,4,5'
function flat2(arr) {
  let res = []
  arr.forEach(item => {
    if (Array.isArray(item)) {
      res.push(...(item.toString().split(',')))
    } else {
      res.push(item)
    }
  });
  return res
}

// 方法二：递归法【重点】
function flat3(arr) {
  let len = arr.length
  let res = []

  for(let i=0; i<len; ++i){
    let item = arr[i]
    if(Array.isArray(item))
      res = res.concat(flat3(item))
    else
      res.push(item)
  }

  return res
}

let arr = [1,2,[3,4,5]]
arr = [1, 2, [3, 4], [5, 6, [7, 8, [9, 10, [11, 12, { aaa: 1 }, [222, [2333333, 'nihao', [123, [12, 3, ['嘻嘻嘻']]]]]]]]], 1, [1, 2, 3]]

console.log('[flat]', flat(arr))
// console.log('[flat2]', flat2(arr))
console.log('[flat3]', flat3(arr))
