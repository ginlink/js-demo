/**
 *  This is a promise Implemented using the promiseA+ specification, For specific specifications, see:
 *  https://promisesaplus.com/
 */

/**
 *  On the whole, it has four aspects:
 *  1.promise has three state
 *  2.promise must has a then method
 *  3.after call then, return a promise
 *  4.promise resolve procedure
 */

export enum PromiseState {
  PENDING,
  FULFILLED,
  REJECTED,
}

export class MyPromise {
  private state = PromiseState.PENDING
  private reason = ''
  private value: any

  // why it is an array?
  // because the promise can be register more than once
  // it is a task queue
  private fulfilledQueueCallbacks: (() => void)[] = []
  private rejectedQueueCallbacks: (() => void)[] = []

  constructor(executor: (resolve: any, reject: any) => void) {
    const resolve = (value: any) => {
      if (this.state === PromiseState.PENDING) {
        // why is use queueMicrotask?
        // because `then code` should be micro task
        queueMicrotask(() => {
          this.value = value
          this.state = PromiseState.FULFILLED

          // call the asynchronous task
          this.fulfilledQueueCallbacks.forEach((x) => x())
        })
      }
    }
    const reject = (reason: string) => {
      if (this.state === PromiseState.PENDING) {
        queueMicrotask(() => {
          this.reason = reason
          this.state = PromiseState.REJECTED

          this.rejectedQueueCallbacks.forEach((x) => x())
        })
      }
    }

    executor(resolve, reject)
  }

  then(onFulfilled?: any, onRejected?: any) {
    // can not return a MyPromise directly,
    // because there need promise2's reference
    const promise2 = new MyPromise((resolve, reject) => {
      if (this.state == PromiseState.PENDING) {
        onFulfilled &&
          this.fulfilledQueueCallbacks.push(() => {
            try {
              const x = onFulfilled(this.value)
              promiseResolveProcedure(promise2, x, resolve, reject)
            } catch (err) {
              reject(err)
            }
          })

        onRejected &&
          this.rejectedQueueCallbacks.push(() => {
            try {
              const x = onRejected(this.reason)
              promiseResolveProcedure(promise2, x, resolve, reject)
            } catch (err) {
              reject(err)
            }
          })
      }

      if (this.state == PromiseState.FULFILLED) {
        if (onFulfilled) {
          try {
            const x = onFulfilled(this.value)

            promiseResolveProcedure(promise2, x, resolve, reject)
          } catch (err) {
            reject(err)
          }
        } else {
          resolve(this.value)
        }
      }

      if (this.state == PromiseState.REJECTED) {
        if (onRejected) {
          try {
            const x = onRejected(this.reason)
            promiseResolveProcedure(promise2, x, resolve, reject)
          } catch (err) {
            reject(err)
          }
        } else {
          reject(this.reason)
        }
      }
    })

    return promise2

    // PromiseResolveProcedure mainly solves two problems：
    // 1.Resolving circular references
    // 2.See if there's a promise inside
    function promiseResolveProcedure(that: MyPromise, x: any, resolve: any, reject: any) {
      if (that === x) {
        return reject(new TypeError('Circular reference'))
      }

      if (typeof x == 'object' || typeof x == 'function') {
        let then: any
        try {
          then = x.then
        } catch (err) {
          return reject(err)
        }

        if (typeof then == 'function') {
          const resolvePromise = (y) => {
            promiseResolveProcedure(that, y, resolve, reject)
          }
          const rejectPromise = (r) => {
            reject(r)
          }

          try {
            then.call(x, resolvePromise, rejectPromise)
          } catch (err) {
            if (that.currentState == PromiseState.PENDING) {
              reject(err)
            }
          }
        } else {
          resolve(x)
        }
      } else {
        resolve(x)
      }
    }
  }

  get currentState() {
    return this.state
  }
}
