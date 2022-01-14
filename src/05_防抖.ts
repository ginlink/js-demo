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
          context = this
          params = args
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
  },
}

let fn = function (e) {
  console.log('[打印我，防抖]:')
  console.log('[e]:', e)
}

// fn = debunce(fn, 1000, true,
fn = debunceR(
  fn,
  1000,
  false,
  () => {
    // document.getElementById('btn').setAttribute('disabled', true)
  },
  () => {
    // document.getElementById('btn').removeAttribute('disabled')
  }
)

let btn = document.getElementById('btn')
if (btn) {
  addEventListener('click', fn, false)
}

function debunce(fn, wait, immediate = true, before = null, callback = null) {
  let timer, context, params

  return function (...args) {
    if (!timer) {
      timer = later()

      // 执行前操作
      before && before()
      if (!immediate) {
        context = this
        params = args
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

      // 执行后回调
      callback && callback()
    }, wait)
  }
}

// 复习：
// 2021-6-27 14:33:34
function debunceR(fn, wait, immediate = true, before = null, after = null) {
  let timer = null,
    context = null,
    params = null

  return function (...args) {
    if (!timer) {
      before && before()

      // 创建timer
      timer = later()
      if (!immediate) {
        context = this
        params = args
      } else {
        fn.apply(this, args)
      }
    } else {
      // 延迟执行
      clearTimeout(timer)
      timer = later()
    }
  }

  function later() {
    return setTimeout(() => {
      timer = null

      if (!immediate) {
        // 执行
        fn.apply(context, params)
        context = params = null
      }
      after && after()
    }, wait)
  }
}
