class EventBus {
  private cache: {
    [type: string]: ((...args: any) => void)[]
  } = {}

  on(type: string, fn: any) {
    const fns = this.cache[type]

    if (fns) {
      fns.push(fn)
    } else {
      this.cache[type] = [fn]
    }

    return this
  }

  once(type: string, fn: any) {
    const wrapped = (...args) => {
      fn.apply(null, args)
      this.off(type, wrapped)
    }

    return this.on(type, wrapped)
  }

  emit(type: string, ...args: any) {
    const fns = this.cache[type]

    fns && fns.forEach((fn) => fn && fn.apply(null, args))

    return this
  }

  off(type: string, fn: any) {
    const fns = this.cache[type]

    if (!fns) return this

    const found = fns.indexOf(fn)
    if (found != -1) {
      fns.splice(found, 1)
    }

    return this
  }

  clear(type?: string) {
    if (!type) {
      this.cache = {}
    } else {
      this.cache[type] = []
    }
    return this
  }
}

function main() {
  const bus = new EventBus()

  const eventName = 'UPDATE'
  const arg = 'hello'

  const update = (arg) => {
    console.log('[]:', arg)
  }

  bus.on(eventName, update)
  bus.on(eventName, update)
  bus.on(eventName, update)

  bus.emit(eventName, arg)

  console.log('[---------off one------------]:')
  bus.off(eventName, update).emit(eventName, arg)

  console.log('[---------clear UPDATE------------]:')
  bus.clear(eventName)
  bus.emit(eventName, arg)

  console.log('[---------once------------]:')
  bus.once(eventName, update)
  bus.emit(eventName, arg)
  bus.emit(eventName, arg)
}
main()

export {}
