
// 最后一次书写时间：2021-5-15 23:10:22
// author: gincool

const PENDING = 'pending'
const REJECTED = 'rejected'
const FULFILLED = 'fulfilled'

function MyPromise(exector) {
  this.status = PENDING
  this.value = ''
  this.reason = ''
  this.onFulfilledCallbacks = []
  this.onRejectedCallbacks = []


  let resolve = (data) => {
    if (this.status === PENDING) {
      this.value = data
      this.status = FULFILLED

      this.onFulfilledCallbacks.forEach(e => e())
    }
  }
  let reject = (data) => {
    if (this.status === PENDING) {
      this.reason = data
      this.status = REJECTED

      this.onRejectedCallbacks.forEach(e => e())
    }
  }
  try {
    exector(resolve, reject)
  } catch (err) {
    reject(err)
  }
}

// 思考，then有哪些功能？
// 1.将值(value or reason)给甩出去
// 2.支持链式调用
MyPromise.prototype.then = function (onFulfilled, onRejected) {
  let promise2 = new MyPromise((resolve, reject) => {
    try {
      setTimeout(() => {
        // 同步情况
        if (this.status === FULFILLED) {
          let A = onFulfilled(this.value)
          resolvePromise(promise2, A, resolve, reject)
        } else if (this.status === REJECTED) {
          let A = onRejected(this.reason)
          resolvePromise(promise2, A, resolve, reject)
        }

        // 异步情况
        if (this.status === PENDING) {

          onFulfilled && this.onFulfilledCallbacks.push(() => {
            let A = onFulfilled(this.value)
            resolvePromise(promise2, A, resolve, reject)
          })
          onRejected && this.onRejectedCallBacks.push(() => {
            let A = onRejected(this.reason)
            resolvePromise(promise2, A, resolve, reject)
          })
        }
      }, 0);
    } catch (err) {
      reject(err)
      onRejected(err)
    }
  })

  return promise2
}

function resolvePromise(promise2, A, resolve, reject) {
  if (promise2 === A) reject(new Error('禁止循环引用！'))

  let called = false
  if (A != null && typeof (A) === 'object' || typeof (A) === 'function') {
    try {
      let then = A.then
      if (typeof (then) === 'function') {
        then.call(A, B => {
          if (!called) {
            called = true
            resolvePromise(promise2, B, resolve, reject)
            // 递归解析
          }
        }, err => {
          // 出错
          if (!called) {
            called = true
            reject(err)
          }
        })
      } else {
        resolve(A)
        // 这里也属于数据类型不符合，直接返回即可
      }
    } catch (err) {
      if (!called) {
        called = true
        reject(A)
      }
    }
  } else {
    resolve(A)
    // 注意这里别reject拒绝了，这里未出错，为普通数据类型，正常返回该值即可
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
// console.log('[mp1]:', mp1)