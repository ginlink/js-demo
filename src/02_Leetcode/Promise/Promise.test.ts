import { MyPromise } from './Promise实现_2022-05-26'

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
      (res) => {},
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
  // it('should rejected by Circular reference', () => {
  //   const promise1 = new MyPromise((resolve) => {
  //     setTimeout(() => {
  //       resolve(123)
  //     }, 1000)
  //   })

  //   const promise2 = promise1.then((res) => {
  //     return promise1
  //   })

  //   return promise2
  //     .then((res) => {
  //       return promise2
  //     })
  //     .then(
  //       (res) => {
  //         expect(res).not.toBeCalled()
  //       },
  //       (err) => {
  //         expect(err).toBeCalled()
  //       }
  //     )
  // })
})
