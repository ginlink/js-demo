function debounce(fn: () => void, wait = 50, immediate = true) {
  let timer = null

  return (...args) => {
    if (timer) {
      clearTimeout(timer)
    }
    if (!timer && immediate) {
      fn.apply(null, args)
    }

    timer = setTimeout(() => {
      // !immediate && fn.apply(null, args)
      fn.apply(null, args)
    }, wait)
  }
}

function main() {
  const fn = debounce(() => {
    console.log('[13232323233]:')
  })

  let counter = 0
  const timer = setInterval(() => {
    if (counter > 10) {
      clearInterval(timer)
    }

    ++counter
    fn()
  }, 100)
}

main()
