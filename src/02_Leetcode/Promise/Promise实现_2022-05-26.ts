// review promise at 2022-05-26 08:28:07

import { Executor, PromiseState } from './types'
import { promiseResolveProcedure } from './utils'

export class MyPromise {
  state = PromiseState.PENDING
  result: any
  reason: any

  fulfilledCallback: (() => void)[] = []
  rejectedCallback: (() => void)[] = []

  constructor(executor: Executor) {
    const resolve = (result: any) => {
      if (this.state === PromiseState.PENDING) {
        this.state = PromiseState.FULFILLED
        this.result = result
      }

      queueMicrotask(() => {
        // dispatch
        this.fulfilledCallback.forEach((fn) => fn())
      })
    }
    const reject = (reason: any) => {
      if (this.state === PromiseState.PENDING) {
        this.state = PromiseState.REJECTED
        this.reason = reason
      }

      queueMicrotask(() => {
        // dispatch
        this.rejectedCallback.forEach((fn) => fn())
      })
    }

    executor(resolve, reject)
  }

  then(onFulfilled?: any, onRejected?: any): MyPromise {
    const that = this

    const promise2 = new MyPromise((resolve, reject) => {
      switch (that.state) {
        case PromiseState.PENDING:
          onFulfilled &&
            that.fulfilledCallback.push(() => {
              const x = onFulfilled(that.result)
              promiseResolveProcedure(promise2, x, resolve, reject)
            })

          onRejected &&
            that.rejectedCallback.push(() => {
              const x = onRejected(that.reason)
              promiseResolveProcedure(promise2, x, resolve, reject)
            })
          break
        case PromiseState.FULFILLED:
          if (onFulfilled) {
            const x = onFulfilled(this.result)
            promiseResolveProcedure(promise2, x, resolve, reject)
          }
          break
        case PromiseState.REJECTED:
          if (onRejected) {
            const x = onRejected(this.reason)
            promiseResolveProcedure(promise2, x, resolve, reject)
          }
          break
        default:
          break
      }
    })

    return promise2
  }

  get currentState() {
    return this.state
  }
}
