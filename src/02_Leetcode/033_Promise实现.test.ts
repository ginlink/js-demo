// import { MyPromise } from './033_Promise实现'
import { MyPromise } from './033_Promise实现_2022-03-07'

describe('promise then test', () => {
  it('should can call then method, resolve', async () => {
    const promise = new MyPromise((resolve) => {
      resolve(123)
    })

    promise.then((res) => {
      expect(res).toBe(123)
    })
  })

  it('should can call then method, reject', async () => {
    const promise = new MyPromise((resolve, reject) => {
      reject('reason')
    })

    promise.then(
      (res) => {
        expect(res).toBe(123)
      },
      (err) => {
        expect(err).toBe('reason')
      }
    )
  })

  it('should can call then method many times', async () => {
    const promise = new MyPromise((resolve) => {
      resolve(123)
    })

    promise.then((res) => {
      expect(res).toBe(123)
    })

    promise.then((res) => {
      expect(res).toBe(123)
    })
  })

  it('should not do anything, if no resolve or reject', async () => {
    const promise = new MyPromise(() => {})

    promise.then((res) => {
      expect(res).toBe(123)
    })

    promise.then((res) => {
      expect(res).toBe(123)
    })
  })

  it('should be called in chain', async () => {
    const promise = new MyPromise((resolve) => {
      resolve(123)
    })

    promise
      .then((res) => {
        expect(res).toBe(123)

        return res
      })
      .then((res) => {
        expect(res).toBe(123)
      })
  })

  it('should call in asynchronous resolve', () => {
    const promise = new MyPromise((resolve) => {
      setTimeout(() => {
        resolve(123)
      }, 1000)
    })

    return promise
      .then((res) => {
        expect(res).toBe(123)

        return res
      })
      .then((res) => {
        expect(res).toBe(123)
      })
  })
  it('should call in chain and asynchronous promise resolve1', () => {
    const promise = new MyPromise((resolve) => {
      setTimeout(() => {
        resolve(123)
      }, 1000)
    })

    return promise
      .then((res) => {
        expect(res).toBe(123)

        return new MyPromise((re, rj) => {
          re(456)
        })
      })
      .then((res) => {
        expect(res).toBe(456)
      })
  })
  it('should call in chain and asynchronous promise resolve2', () => {
    const promise = new MyPromise((resolve) => {
      setTimeout(() => {
        resolve(123)
      }, 1000)
    })

    return promise
      .then((res) => {
        expect(res).toBe(123)

        return new MyPromise((re, rj) => {
          setTimeout(() => {
            re(456)
          }, 1000)
        })
      })
      .then((res) => {
        expect(res).toBe(456)
      })
  })
  it('should call in chain and asynchronous resolve, but no result', () => {
    const promise = new MyPromise((resolve) => {
      setTimeout(() => {
        resolve(123)
      }, 1000)
    })

    return promise
      .then((res) => {
        expect(res).toBe(123)
      })
      .then((res) => {
        expect(res).toBeUndefined()
      })
  })
})
