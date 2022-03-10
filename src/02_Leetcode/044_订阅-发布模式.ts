class PubCenter {
  private subscribers: {
    [type: string]: ((...args: any) => void)[]
  } = {}

  subscribe(type: string, fn: any) {
    const topic = this.subscribers[type]

    if (topic) {
      topic.push(fn)
    } else {
      this.subscribers[type] = [fn]
    }
  }

  publish(msg: any, type?: string) {
    if (!type) {
      Object.keys(this.subscribers).forEach((type) => {
        this.publish(msg, type)
      })
    } else {
      const topic = this.subscribers[type]

      topic?.forEach((x) => x && x(`type:${type}, msg:${msg}`))
    }
  }

  unsubscribe(type: string, fn: any) {
    if (!type || !fn) return

    const existIndex = this.subscribers[type]?.indexOf(fn)

    if (existIndex != -1) {
      this.subscribers[type].splice(existIndex, 1)
    }
  }

  clear(type?: string) {
    if (!type) {
      this.subscribers = {}
    } else {
      this.subscribers[type] = this.subscribers[type] ? [] : undefined
    }
  }
}

function main() {
  const pubCenter = new PubCenter()

  const fn1 = (msg) => {
    console.log('[fn1 receive msg]:', msg)
  }
  const fn2 = (msg) => {
    console.log('[fn2 receive msg]:', msg)
  }
  const fn3 = (msg) => {
    console.log('[fn3 receive msg]:', msg)
  }

  pubCenter.subscribe('SMS', fn1)
  pubCenter.subscribe('SMS', fn2)
  pubCenter.subscribe('SMS', fn3)
  pubCenter.subscribe('QQ', fn1)

  pubCenter.publish('hello, everyone111')

  console.log('[-----------unsubscribe fn2 SMS--------------]:')

  pubCenter.unsubscribe('SMS', fn2)
  pubCenter.publish('hello, everyone222')

  console.log('[-----------clear all SMS--------------]:')

  pubCenter.clear('SMS')
  pubCenter.publish('hello, everyone333')
}

main()
