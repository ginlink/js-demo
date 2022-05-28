const obj = {
  name: 'John',
}

function throttle(fn: () => void, wait = 50) {
  // let lastTime: number = -Infinity
  let lastTime = 0

  return function (...args) {
    const curr = new Date().getTime()

    if (curr - lastTime >= wait) {
      // apply null said that it is window object
      // fn.apply(null, args)

      // It's better to pass `this` here
      // If you use the arrow function outside, it doesn't work here
      fn.apply(this, args)
      lastTime = curr
    }
  }
}

function main() {
  const that = this

  // const throttled = throttle(() => {
  //   console.log('[equal]:', that === this)
  //   console.log('[1秒打印一次]:')
  // }, 1000)
  const throttled = throttle(function () {
    console.log('[this]:', this)
    console.log('[equal]:', that === this)
    console.log('[1秒打印一次]:')
  }, 1000)

  setInterval(() => {
    throttled()
  }, 100)
}

main()
