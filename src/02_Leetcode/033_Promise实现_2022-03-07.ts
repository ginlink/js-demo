// review promise at 2022-03-07

export enum PromiseState {
  PENDING,
  FULFILLED,
  REJECTED,
}

export class MyPromise {
  private state = PromiseState.PENDING
  private value: any
  private reason: any

  private fulfilledQueueCallbacks: (() => void)[] = []
  private rejectedQueueCallbacks: (() => void)[] = []

  constructor(executor: (resolve: any, reject: any) => void) {
    const resolve = (value: any) => {
      if (this.state == PromiseState.PENDING) {
        queueMicrotask(() => {
          this.state = PromiseState.FULFILLED
          this.value = value

          this.fulfilledQueueCallbacks.forEach((x) => x && x())
        })
      }
    }
    const reject = (reason: any) => {
      if (this.state == PromiseState.PENDING) {
        queueMicrotask(() => {
          this.state = PromiseState.REJECTED
          this.reason = reason
          this.rejectedQueueCallbacks.forEach((x) => x && x())
        })
      }
    }

    executor(resolve, reject)
  }

  then(onFulfilled?: (value: any) => any, onRejected?: (reason: any) => any) {
    const promise = new MyPromise((resolve: (value: any) => void, reject: (reason: any) => void) => {
      if (this.state == PromiseState.PENDING) {
        onFulfilled &&
          this.fulfilledQueueCallbacks.push(() => {
            const x = onFulfilled(this.value)

            promiseResolveProcess(promise, x, resolve, reject)
          })

        onRejected &&
          this.rejectedQueueCallbacks.push(() => {
            const x = onRejected(this.reason)

            promiseResolveProcess(promise, x, resolve, reject)
          })
      } else if (this.state == PromiseState.FULFILLED && onFulfilled) {
        const x = onFulfilled(this.value)

        promiseResolveProcess(promise, x, resolve, reject)
      } else if (this.state == PromiseState.REJECTED && onRejected) {
        const x = onRejected(this.reason)

        promiseResolveProcess(promise, x, resolve, reject)
      }
    })

    return promise

    function promiseResolveProcess(
      promise: MyPromise,
      x: any,
      resolve: (value: any) => void,
      reject: (reason: any) => void
    ) {
      if (promise === x) {
        throw new Error('TypeError: reference error')
      }

      if (typeof x === 'object' || typeof x === 'function') {
        const then = x.then

        try {
          const resolvePromise = (y) => {
            promiseResolveProcess(promise, y, resolve, reject)
          }
          const rejectPromise = (reason) => {
            reject(reason)
          }

          then.call(x, resolvePromise, rejectPromise)
        } catch (err) {
          if (promise.state == PromiseState.PENDING) {
            reject(err)
          }
        }
      } else {
        return resolve(x)
      }
    }
  }
}

function main() {
  const promise = new MyPromise((resolve, reject) => {
    setTimeout(() => {
      resolve(123)
    }, 1000)
  })

  promise
    .then(
      (res) => {
        console.log('[res111]:', res)
        return new MyPromise((resolve, reject) => {
          setTimeout(() => {
            resolve(
              new MyPromise((resolve) => {
                setTimeout(() => {
                  resolve(
                    new MyPromise((resolve) => {
                      resolve(456)
                    })
                  )
                }, 1000)
              })
            )
          }, 1000)
        })
      },
      (err) => {
        console.log('[err]:', err)
      }
    )
    .then((res) => {
      console.log('[res222]:', res)
    })

  // promise.then(
  //   (res) => {
  //     console.log('[res]:', res)
  //   },
  //   (err) => {
  //     console.log('[err]:', err)
  //   }
  // )
}

main()
