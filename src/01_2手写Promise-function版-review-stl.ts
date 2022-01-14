
// 最后一次书写时间：2021-5-15 23:10:22
// 最后一次书写时间：2021-5-17 21:09:30
// author: gincool
// 问题1：promise执行的顺序是什么？
// 创建Promise对象之后，有两步已经完成
//    1.Promise内部已经初始化完毕
//    2.resolve和reject也准别好了
//    这个时候就要分情况了，如果同步，则可能已经调用resolve或者reject了
//      如果是异步，那么加入回调函数中，等待外部调用resolve或者reject
// 之后，如果调用then，then有什么用？
//    then主要用于将上一步的内容甩出，这里就涉及到上一步是否执行
//    完毕了(也就是同步和异步)，同步则直接甩出，异步则扔进异步容器
//    当然，这里还涉及到解析这个值是普通值还是Promise对象，如果普通值则直接resolve，
//    如果为Promise，则要去调用她的then，根据then出来的值去判断直接返回还是继续向下解析。
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'
function MyPromise(exector) {
  this.status = PENDING
  this.value = ''
  this.reason = ''
  // 成功和失败消息

  this.onFulfilledCallbacks = []
  this.onRejectedCallbacks = []
  // 异步回调容器

  let resolve = (data) => {
    this.value = data
    this.status = FULFILLED
    this.onFulfilledCallbacks.forEach(e => e())
    // 消费，为then做准备，把异步的东西都消费掉
  }
  let reject = (data) => {
    this.reason = data
    this.status = REJECTED
    this.onRejectedCallbacks.forEach(e => e())
    // 消费
  }
  try {
    exector(resolve, reject)
  } catch (err) {
    reject(err)
  }

}
MyPromise.prototype.then = function (onFulfilled, onRejected) {
  let promise2 = new MyPromise((resolve, reject) => {
    try {
      setTimeout(() => {
        // 同步情况
        if (this.status === FULFILLED) {
          let A = onFulfilled && onFulfilled(this.value)
          resolvePromise(promise2, A, resolve, reject)
        }
        if (this.status === REJECTED) {
          let A = onRejected && onRejected(this.reason)
          resolvePromise(promise2, A, resolve, reject)
        }
        if (this.status === PENDING) {
          // 异步情况
          onFulfilled && this.onFulfilledCallbacks.push(() => {
            let A = onFulfilled && onFulfilled(this.value)
            resolvePromise(promise2, A, resolve, reject)
          })
          onRejected && this.onRejectedCallbacks.push(() => {
            let A = onRejected && onRejected(this.reason)
            resolvePromise(promise2, A, resolve, reject)
          })
        }
      }, 0)
    } catch (err) {
      reject(err)
      onRejected(err)
    }
  })
  return promise2

  function resolvePromise(promise2, A, resolve, reject) {
    if (promise2 === A) return reject(new ReferrenceError('循环引用！'))
    let called=false

    if (A !== null && typeof (A) === 'function' || typeof (A) === 'object') {
      try {
        // 抓then为undefined
        let then = A.then
        if (typeof (then) === 'function') {
          then.call(A, B => {
            if (!called) {
              called = true
              resolvePromise(A, B, resolve, reject)
              // 让下一步决定是直接甩出还是继续解析
            }
          }, err => {
            if (!called) {
              called = true
              reject(err)
            }
          })
        } else {
          resolve(A)
          // 类型不符，直接返回  
        }
      } catch (err) {
        if (!called) {
          called = true
          reject(err)
        }
      }
    } else {
      resolve(A)
      // 常规值，直接甩出
    }
  }
}

let mp1 = new MyPromise((re, rj) => {
  console.log('[]:', 123)
  re('成功')
})

mp1.then(res => {
  console.log('[res]:', res)
  // return 123
  return new MyPromise((re, rj) => {
    // let sum = 1 + 1
    // if (sum === 2) re(sum)
    // else rj('出错了')

    re(new MyPromise((re2,rj2)=>{
      re2(123)
    }))
  })

}).then(res => {
  console.log('[上一次计算的结果是]:', res)
})

// console.log('[mp1]:', mp1.valueOf())
// console.log('[mp1]:', mp1)