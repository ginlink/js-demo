/**
 * function版符合官方规范，建议这样书写
 */

const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

function MyPromise(exector) {
  this.status = PENDING
  this.reason = ''
  this.value = ''
  this.onFulfilledCallbacks = []
  this.onRejectedCallBacks = []

  let resovle = (value) => {
    if (this.status === PENDING) {
      this.value = value
      this.status = FULFILLED

      // 消化队列
      this.onFulfilledCallbacks.map(e => e())
    }
  }
  let reject = (reason) => {
    if (this.status === PENDING) {
      this.reason = reason
      this.status = REJECTED

      // 消化队列
      this.onRejectedCallBacks.map(e => e())
    }
  }

  try {
    exector(resovle, reject)
  } catch (err) {
    reject(err)
  }

}

MyPromise.prototype.then = function (onFulfilled, onRejected) {

  let promise2 = new MyPromise((resolve, reject) => {
    // 要支持链式调用，就需要创造更多的promise
    // 也就是下一个拿到的是上一个的值
    try {
      setTimeout(() => {
        // 这里用一个定时器主要有两个目的：
        // 1.能够拿到自身
        // 2.让promise为异步的

        // 同步情况
        if (this.status === FULFILLED && onFulfilled) {
          let A = onFulfilled(this.value) // 上一次的结果
          resolvePromise(promise2, A, resolve, reject)
          // 委托这个函数帮忙处理看一下A是什么
        }
        if (this.status === REJECTED && onRejected) {
          let A = onRejected(this.reason)
          resolvePromise(promise2, A, resolve, reject)
        }

        // 异步情况
        if (this.status === PENDING) {
          onFulfilled && this.onFulfilledCallbacks.push(() => {
            let A = onFulfilled(this.value)
            resolvePromise(promise2, A, resolve, reject)
            // 委托这个函数帮忙处理看一下A是什么
          })
          onRejected && this.onRejectedCallBacks.push(() => {
            let A = onRejected(this.reason)
            resolvePromise(promise2, A, resolve, reject)
            // 委托这个函数帮忙处理看一下A是什么
          })
        }
      }, 0);
    } catch (err) {
      reject(err)
    }
  })
  return promise2
  // 返回新创建的promise，为支持链式调用
}

MyPromise.prototype.catch = function (onRejected) {
  // 为什么catch没有同步的情况？
  onRejected && this.onRejectedCallBacks.push(() => {
    onRejected(this.reason)
  })
}

MyPromise.prototype.valueOf = function () {
  return 111
}

function resolvePromise(promise2, A, resolve, reject) {
  if (promise2 === A) reject(new Error('不能循环引用！'))
  // promise2主要用来解决循环引用问题

  let called = false;
  if (A != null && typeof (A) == 'object' || typeof (A) == 'function') {
    try {
      // A+规范规定，then为下一个promise的then
      let then = A.then
      if (typeof (then) == 'function') {
        // if (typeof (then) == 'object') {
        // 注意是then，而不是A
        then.call(A, B => {
          if (called) return;
          called = true
          resolvePromise(promise2, B, resolve, reject)
          // 递归解析
        }, err => {
          if (called) return;
          called = true
          reject(err)
        })
      } else {
        resolve(A)
      }
    } catch (err) {
      if (called) return;
      called = true
      reject(err)
    }
  } else {
    resolve(A)
  }
}

let mp1 = new MyPromise((re, rj) => {
  console.log('[]:', 123)
  re('成功')
})

mp1.then(res => {
  console.log('[res]:', res)
  return new MyPromise((re, rj) => {
    let sum = 1 + 1
    if (sum === 2) re(sum)
    else rj('出错了')
  })

}).then(res => {
  console.log('[上一次计算的结果是]:', res)
})

// console.log('[mp1]:', mp1.valueOf())
console.log('[mp1]:', mp1)