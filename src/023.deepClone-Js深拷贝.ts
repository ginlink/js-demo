/**
 * TODO无法深拷贝函数
 */

function main() {
  function deepClone(origin: any) {
    const map = new Map()
    return baseClone(origin)

    function baseClone(origin: any) {
      // 1.条件
      if (origin === null || origin === undefined) return origin

      if (origin instanceof Date) return new Date(origin.getTime())
      if (origin instanceof RegExp) return new RegExp(origin)

      const type = typeof origin
      // if(type === 'function') return new Function('return' + origin.toString())()
      // if(type === 'function') return new function(origin){}
      // if(type === 'function') return new function(origin){}
      // 拷贝函数有问题，如果函数内部有闭包量，那么会失败
      // TODO目前函数并未实现深拷贝

      if (type !== 'object') return origin

      // 2.递归
      const keys = Object.keys(origin)
      let target = null

      target = origin instanceof Array ? [] : Object.create(origin)

      //用当前值和origin比较，值是新创建数据本身
      map.set(origin, target)

      const len = keys.length
      for (let i = 0; i < len; ++i) {
        const key = keys[i]
        const value = origin[key]

        if (map.has(value)) {
          target[key] = map.get(value)
        } else {
          target[key] = deepClone(value)
          // 注意：数组也可以通过arr['0']的方式去赋值
        }
      }

      return target
    }
  }

  const a = {
    a: 123,
    b: 456,
    c: undefined,
    d: null,
    e: /123/,
    f: new Date('2021-11-15 15:16:03'),
    g: null,
    arr1: null,
    arr2: null,
    arr3: [1, 2, 3],
  } as {
    a: any
    b: any
    e: any
    g: any
    arr1: any
    arr2: any
    arr3: any
  }

  // circle ref（循环引用）
  a.g = a

  // same ref （相同引用）
  const arr = ['i am arr']
  a.arr1 = arr
  a.arr2 = arr

  const clonedA = deepClone(a)

  // change something
  a.a = 456
  a.e = /456/
  arr.push('i am add el after')
  a.arr3.push(4)

  // log
  console.log('[](a, clonedA):', a, clonedA)
}

// main()

new Function 

