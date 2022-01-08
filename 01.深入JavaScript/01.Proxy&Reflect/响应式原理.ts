const obj = {
  name: 'why',
}

class Depend {
  reactiveFns = []

  addDepend(fn) {
    this.reactiveFns.push(fn)
  }

  notify() {
    this.reactiveFns.forEach((fn) => fn())
  }
}
const weakMap = new WeakMap()
const objDependMap = new Map()

const objProxy = new Proxy(obj, {
  get(target, key, receiver) {
    console.log(`${String(key)} 被访问了`)

    const depend = new Depend()
    depend.addDepend(() => {
      console.log('[依赖被更新了，自动执行]:')
      console.log('[]:', target[key])
    })
    objDependMap.set(key, depend)
    weakMap.set(target, objDependMap)

    return Reflect.get(target, key, receiver)
  },
  set(target, key, value, receiver) {
    console.log(`${String(key)} 被设置了`)

    const result = Reflect.set(target, key, value, receiver)

    if (result) {
      const depend = weakMap.get(target)?.get(key)
      depend?.notify()
    }

    return result
  },
})

objProxy.name
objProxy.name = 'John'
