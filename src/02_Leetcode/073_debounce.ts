export function debounce111<T extends (...args: any) => any>(fn: T, wait = 50, immediate = true) {
  let timer: ReturnType<typeof setTimeout> | null = null
  return function (...args: Parameters<T extends (...args: any) => any ? T : () => any>): ReturnType<T> {
    if (timer) clearTimeout(timer)

    if (immediate && !timer) {
      // @ts-ignore
      return fn.apply(this, args)
    }

    timer = setTimeout(() => {
      // @ts-ignore
      return fn.apply(this, args)
    }, wait)
  }
}

// function main() {
//   const fn = (val: string) => {
//     console.log('[]:', 123)

//     return 123
//   }

//   const fnDebounced = debounce111(fn)
//   // const fnDebounced = debounce111('')

//   console.log('[]:', fnDebounced('123'))
// }

// main()

// export {}
