let activeWatchFn = null
function watchFn(fn) {
  activeWatchFn = fn
  fn()
  activeWatchFn = null
}

class Depend {
  reactiveFns = new Set<() => void>()

  depend() {
    if (activeWatchFn) {
      this.reactiveFns.add(activeWatchFn)
    }
  }

  notify() {
    this.reactiveFns.forEach((fn) => fn())
  }
}

// dependence manager
const dependManager = new WeakMap()
function getDepend(target: any, key: string | symbol): Depend {
  let dependMap = dependManager.get(target)
  if (!dependMap) {
    // create a dependMap
    dependMap = new Map()
    dependManager.set(target, dependMap)
  }

  let depend = dependMap.get(key)
  if (!depend) {
    depend = new Depend()
    dependMap.set(key, depend)
  }

  return depend
}

// reactive function
function reactive(obj) {
  return new Proxy(obj, {
    get(target, key, receiver) {
      // collect dependence
      const depend = getDepend(target, key)
      depend.depend()

      return Reflect.get(target, key, receiver)
    },
    set(target, key, value, receiver) {
      const result = Reflect.set(target, key, value, receiver)

      if (result) {
        // notify
        const depend = getDepend(target, key)
        depend.notify()
      }

      return result
    },
  })
}

const obj1Proxy = reactive({
  name: 'why1',
  age: 18,
})
const obj2Proxy = reactive({
  name: 'why2',
  age: 18,
})

function main() {
  // test
  watchFn(() => {
    console.log('[obj1Proxy.name改变，将会自动执行]:', obj1Proxy.name)
    console.log('[obj1Proxy.age改变，将会自动执行]:', obj1Proxy.age)
  })
  watchFn(() => {
    console.log('[obj2Proxy.name改变，将会自动执行]:', obj2Proxy.name)
    console.log('[obj2Proxy.age改变，将会自动执行]:', obj2Proxy.age)
  })

  console.log('[开始改变-----------------]:')
  // test auto change
  obj1Proxy.name = 'John1'
  obj2Proxy.name = 'John2'

  obj1Proxy.age = 20
  obj2Proxy.age = 20
}
main()

export {}
