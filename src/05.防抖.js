/**
 * 防抖与节流
 * 防抖：在wait时间内只执行一次
 * 节流：在所执行时间内，间隔一定时间执行一次
 */

module.exports = {
  debunce(fn, wait, immediate = true) {
    let timer, context, params

    return function (...args) {
      if (!timer) {
        timer = later()

        if (!immediate) {
          context = this; params = args
        } else {
          fn.apply(this, args)
        }
      } else {
        // 重复调用，清除定时器，
        clearTimeout(timer)
        timer = later()
      }
    }

    function later() {
      return setTimeout(() => {
        timer = null

        if (!immediate) {
          fn.apply(context, params)
          context = params = null
        }
      }, wait)
    }
  }
}