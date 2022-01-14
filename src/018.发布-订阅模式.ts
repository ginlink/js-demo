
interface EventCallback {
  (...argvs: any[]):void
  // argvs is spreadable 可扩展，tuple or ...

  // ...argvs一定为数组，将外界参数收起来为数组argvs
}
interface NormalEvent{
  queue: Record<string, EventCallback[]>
  listen: (eventName: string, callback: (...argvs: any[])=>void)=> void
  trigger: (eventName: string, ...argvs: any[])=> boolean
  remove: (eventName: string, callback: (...argvs: any[])=>void)=> boolean
}

function main(){
  const nomalEvent: NormalEvent = {
    queue: {},
    listen(eventName: string, callback: (...argvs: any[])=>void){
      const that: NormalEvent = this
      // 不知道还有没有更好的写法，这里this没有ts提示，只有手动从any收缩它的类型

      if(!that.queue[eventName]) that.queue[eventName] = []

      that.queue[eventName].unshift(callback)
    },
    trigger(eventName: string, ...argvs: any[]): boolean{
      const that: NormalEvent = this
      const container = that.queue[eventName]

      if(!container) return false

      const len = container.length
      for(let i=len-1; i>=0; --i) container[i](...argvs)
      return true
    },
    remove(eventName: string, callback: (...argvs: any[])=>void): boolean{
      const that: NormalEvent = this
      const container = that.queue[eventName]

      if(!container) return false
      
      const len = container.length
      for(let i=len; i>=0; --i){ // 队列约定，从后向前遍历
        if(container[i] === callback) {
          container.splice(i, 1) // 删除这个订阅

          return true
        }
      }

      return false
    }
  }

  function installEvent(target: Record<string,any>): NormalEvent{
    const res = {}

    for(let key in nomalEvent) {
      res[key] = nomalEvent[key]
    }
    for(let key in target) {
      res[key] = target[key]
    }

    // 必须主动断言类型，ts无法推断手动赋值的对象
    return res as NormalEvent
  }

  const origin = {aaa:1, bbb:2}
  const eventedOrigin = installEvent(origin)

  eventedOrigin.listen('sale', (price: number) => {
    console.log('[sale事件执行了]:', price)
  })

  const unsaleHandler = (price: number)=>{
    console.log('[unsale事件执行了]:', price)
  }

  eventedOrigin.listen('unsale', unsaleHandler)

  eventedOrigin.trigger('sale')
  eventedOrigin.trigger('unsale', 100000)

  eventedOrigin.remove('unsale', unsaleHandler) // 取消订阅
  
  eventedOrigin.trigger('unsale', 100000)

}

main()
