
class MyError extends Error {
  constructor(msg) {
    super()
    this.message = msg
  }
}

async function main() {

  /**
   * 注意：
   *  1.抓到一个错误就会触发catch
   *  2.所以不要指望一个try.catch处理所有类型的错误，
   *    应该注意抓的位置不要太深，也不要太浅
   */
  try {
    await asyncFunc()
    await otherAsyncFunc()
  } catch (err) {
    if (err instanceof MyError) {
      console.log('[err]:', err.message)
    } else {
      console.log('[其他err]:', err.message)
    }
  }
}

function asyncFunc() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('没问题')
      // reject(new MyError('MyError'))
    }, 1000);
  })
}

function otherAsyncFunc() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('其他错误'))
    }, 1000);
  })
}

main()