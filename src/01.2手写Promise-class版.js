

class MyPromise {
  // stats = ['pending', 'fulfilled', 'rejected']
  PENDING = 'pending'
  FULFILLED = 'fulfilled'
  REJECTED = 'rejected'
  // stat = status[0]
  constructor(fn) {
    this.status = this.PENDING
    this.reason = ''
    this.value = ''
    this.onFulfilledCallBacks = []
    this.onRejectedCallBacks = []

    let resovle = (value) => {
      if (this.status === this.PENDING) {
        this.value = value
        this.status = this.FULFILLED

        // 消化队列
        this.onFulfilledCallBacks.map(e => e())
      }
    }
    let reject = (reason) => {
      if (this.status === this.PENDING) {
        this.reason = reason
        this.status = this.REJECTED

        // 消化队列
        this.onRejectedCallBacks.map(e => e())
      }
    }

    try {
      fn(resovle, reject)
    } catch (err) {
      reject(err)
    }
  }

  then(onFulfilled, onRejected) {

    // 要支持链式调用，就需要创造更多的promise
    let promise2 = new MyPromise((resolve, reject) => {
      try {
        setTimeout(() => {
          // 同步情况
          if (this.status === this.FULFILLED && onFulfilled) {
            let A = onFulfilled(this.value) // 上一次的结果
            resolvePromise(promise2, A, resolve, reject)
            // 委托这个函数帮忙处理看一下A是什么
          }
          if (this.status === this.REJECTED && onRejected) {
            let A = onRejected(this.reason)
            resolvePromise(promise2, A, resolve, reject)
          }

          // 异步情况
          if (this.status === this.PENDING) {
            onFulfilled && this.onFulfilledCallBacks.push(() => {
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

  catch(onRejected) {
    // 为什么catch没有同步的情况？
    onRejected && this.onRejectedCallBacks.push(() => {
      onRejected(this.reason)
    })
  }

}

function resolvePromise(promise2, A, resolve, reject) {
  if (promise2 === A) reject(new Error('不能循环引用！'))
  // promise2主要用来解决循环引用问题

  let called = false;
  if (A != null && typeof (A) == 'object' || typeof (A) == 'function') {
    try {
      let then = A.then
      console.log('[then]:', typeof (then))
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
  return '成功2'

}).then(res => {
  console.log('[上一次计算的结果是]:', res)
})

// console.log('[mp1]:', mp1)