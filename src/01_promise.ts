enum PromiseState {
  PENDING,
  FULFILLED,
  REJECTED,
}

class MyPromise {
  state: PromiseState = PromiseState.PENDING
  value: any = undefined
  reason: any = undefined
  onFulfilledCallback: (() => void)[] = []
  onRejectedCallback: (() => void)[] = []

  constructor(executor: (resolve: (value: any) => void, reject: (reason: any) => void) => void) {
    const resolve = (value: any) => {
      if (this.state !== PromiseState.PENDING) return

      queueMicrotask(() => {
        this.state = PromiseState.FULFILLED
        this.value = value
        this.onFulfilledCallback.forEach((item) => item())
      })
    }
    const reject = (reason: any) => {
      if (this.state !== PromiseState.PENDING) return

      queueMicrotask(() => {
        this.state = PromiseState.REJECTED
        this.reason = reason
        this.onRejectedCallback.forEach((item) => item())
      })
    }

    executor(resolve, reject)
  }

  then(onFulfilled?: (value: any) => any, onRejected?: (reason: any) => any) {
    const newPromise = new MyPromise((re, rj) => {
      if (this.state === PromiseState.PENDING) {
        onFulfilled &&
          this.onFulfilledCallback.push(() => {
            const A = onFulfilled(this.value)

            resolvePromise(newPromise, A, re, rj)
          })

        onRejected &&
          this.onRejectedCallback.push(() => {
            const A = onRejected(this.reason)

            resolvePromise(newPromise, A, re, rj)
          })
      }

      if (onFulfilled && this.state === PromiseState.FULFILLED) {
        const A = onFulfilled(this.value)

        // 处理返回数据
        resolvePromise(newPromise, A, re, rj)
      }
      if (onRejected && this.state === PromiseState.REJECTED) {
        const A = onRejected(this.value)

        resolvePromise(newPromise, A, re, rj)
      }
    })

    return newPromise
  }
}

const promise = new MyPromise((re, rj) => {
  console.log('[init]:')

  setTimeout(() => {
    rj('rejected')
    // re('resolved')
  }, 500)
})

promise
  .then(
    (res) => {
      console.log('[res1]:', res)

      const p = new MyPromise((re) => {
        setTimeout(() => {
          re(123)
        }, 500)
      })

      return p
    },
    (err) => {
      console.log('[err1]:', err)
    }
  )
  .then(
    (res) => {
      console.log('[res10]:', res)
    },
    (err) => {
      console.log('[err10]:', err)
    }
  )

// promise.then((res) => {
//   console.log('[res11]:', res)
// })

// setTimeout(() => {
//   promise.then((res) => {
//     console.log('[res2]:', res)
//   })
// }, 501)

function resolvePromise(newPromise: MyPromise, A: any, resolve: (value: any) => void, reject: (reason: any) => void) {
  if (A === newPromise) {
    reject('Circular reference')
  } else if (typeof A === 'object' || typeof A === 'function') {
    const then = A.then

    try {
      if (typeof then === 'function') {
        then.call(
          A,
          (B: MyPromise | void) => {
            resolvePromise(A, B, resolve, reject)
          },
          (err) => {
            reject(err)
          }
        )
      } else {
        resolve(A)
      }
    } catch (err) {
      reject(err)
    }
  } else {
    resolve(A)
  }
}
// promise.then((res) => {
//   console.log('[res]:', res)
// })

// console.log('[promise]:', promise)
