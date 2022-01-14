/**
 * 原文地址：https://www.jianshu.com/p/736022b6faec
 * 但有一个问题，就是promise2会出现
 * "ReferenceError: Cannot access 'promise2' before initialization"
 * 的问题，后通过定时器解决
 * 参考地址：https://www.jianshu.com/p/07354cef6149
 */
class PromisePolyfill {
  constructor(exector = () => { }) {
    this.status = 'pending' // promise当前状态
    this.reason = undefined // 用户回显到reject函数的值
    this.value = undefined // 用户回显到resolve函数的值
    // 成功事件回调队列
    this.onFulfilledCallBacks = []
    // 失败事件回调队列
    this.onRejectedCallBacks = []

    //实现resolve函数
    let resolve = (value) => {
      if (this.status === 'pending') {
        this.value = value
        this.status = 'fulfilled'
        this.onFulfilledCallBacks.map(e => e())
      }
    }

    // 实现reject函数
    let reject = (reason) => {
      if (this.status === 'pending') {
        this.reason = reason
        this.status = 'rejected'
        this.onRejectedCallBacks.map(e => e())
      }
    }

    try {
      // 运行执行器
      exector(resolve, reject)
    } catch (err) {
      reject(err)
    }
  }

  then(onFulfilled, onRejected) {

    let promise2 = new PromisePolyfill((resolve, reject) => {
      if (this.status === 'fulfilled' && onFulfilled) {
        let x = onFulfilled(this.value)
        // resolvePromise函数，处理自己return的promise和默认的promise2的关系
        resolvePromise(promise2, x, resolve, reject)
      }
      if (this.status === 'rejected' && onRejected) {
        let x = onRejected(this.reason)
        resolvePromise(promise2, x, resolve, reject)
      }
      // 异步情况
      if (this.status === 'pending') {
        // 将任务成功回调加入到成功队列中
        onFulfilled && this.onFulfilledCallBacks.push(() => {
          let x = onFulfilled(this.value)
          // resolvePromise函数，处理自己return的promise和默认的promise2的关系
          resolvePromise(promise2, x, resolve, reject)
        })
        // 将任务失败回调加入到失败队列中
        onRejected && this.onRejectedCallBacks.push(() => {
          let x = onRejected(this.reason)
          resolvePromise(promise2, x, resolve, reject)
        })
      }
    })
    return promise2
  }
}
function resolvePromise(promise2, x, resolve, reject) {
  // 循环引用报错
  if (x === promise2) {
    // reject报错
    return reject(new TypeError('Chaining cycle detected for promise'));
  }
  // 防止多次调用
  let called;
  // x不是null 且x是对象或者函数
  if (x != null && (typeof x === 'object' || typeof x === 'function')) {
    try {
      // A+规定，声明then = x的then方法
      let then = x.then;
      // 如果then是函数，就默认是promise了
      if (typeof then === 'function') {
        // 就让then执行 第一个参数是this   后面是成功的回调 和 失败的回调
        then.call(x, y => {
          // 成功和失败只能调用一个
          if (called) return;
          called = true;
          // resolve的结果依旧是promise 那就继续解析
          resolvePromise(promise2, y, resolve, reject);
        }, err => {
          // 成功和失败只能调用一个
          if (called) return;
          called = true;
          reject(err);// 失败了就失败了
        })
      } else {
        resolve(x); // 直接成功即可
      }
    } catch (e) {
      // 也属于失败
      if (called) return;
      called = true;
      // 取then出错了那就不要在继续执行了
      reject(e);
    }
  } else {
    resolve(x);
  }
}


let mp1 = new PromisePolyfill((re, rj) => {
  console.log('[]:', 123)
  re('成功')
})

let mp2 = mp1.then(res => {
  console.log('[res]:', res)
  return '成功2'
})
console.log('[mp2]:', mp2)
