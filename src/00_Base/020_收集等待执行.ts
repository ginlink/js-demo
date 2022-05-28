/***
 * 描述：在一定时间内，收集操作，时间到了一起执行
 */

function main20() {
  interface CollectManaget {
    cache: any[]
    timer: NodeJS.Timeout
    add: (item: any) => CollectManaget
    collectWaitExecute: () => void
    _execute: () => void
  }

  const COLLECT_DELAY = 2000
  const collectManaget: CollectManaget = {
    cache: [],
    timer: null,
    add(callback: any) {
      const that: CollectManaget = this
      that.cache.push(callback)

      return that
    },
    collectWaitExecute() {
      const that: CollectManaget = this
      if (that.timer) return

      that.timer = setTimeout(() => {
        that._execute()

        // 重置
        that.timer = null
        that.cache.length = 0
      }, COLLECT_DELAY)
    },
    _execute() {
      const that: CollectManaget = this

      const cache = that.cache

      if (!cache || cache.length === 0) return

      const len = cache.length
      for (let i = 0; i < len; ++i) cache[i]()
    },
  }

  // 模拟400ms收集一次，2000ms执行一次，也就是收集了5次
  setInterval(() => {
    collectManaget.add(() => {
      console.log('[执行我]:')
    })
    collectManaget.collectWaitExecute() // 收集后执行
  }, 400)
}

main20()
