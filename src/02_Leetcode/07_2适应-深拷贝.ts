
// 任意类型深拷贝
// 遍历+分类+递归法
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
// 从中学到了什么？
// 只做分内之事，
// 例如：对于数组类型，我这一个递归里面，我只处理数组有关的逻辑，
// 其他与我无关，不是数组类型，统统扔给下一次递归。

// let o = [1,2,3,4,5,[6,7,8,9,10]]
// let o = { arr: [1, 2, 3, 4, 5], name: '张三', age: 18, obj: { name: '李四', age: 20 } }
let o = {
  arr: [1, 2, 3, 4, 5], name: '张三', age: 18,
  obj: {
    name: '李四', age: 20,
    arr: [6, 7, 8, 9, 10, null, /123/, undefined,
      function () { },
      { aaa: 111, speak: function () { } }
    ]
  },
  no: null
}
let n = deep_clone1(o)

console.log('[o]:', o)
console.log('[n]:', n)
console.log('[equal1]:', o == n)
