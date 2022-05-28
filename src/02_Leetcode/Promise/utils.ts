import { MyPromise } from './Promise实现_2022-05-26'

export function promiseResolveProcedure(
  promise2: MyPromise,
  x: any,
  resolve: (result: any) => void,
  reject: (reason: any) => void
) {
  try {
    if (promise2 === x) {
      throw new Error('Circular reference')
    }

    // console.log('[x]:', x)

    if (typeof x == 'object' || typeof x == 'function') {
      const then = x.then

      if (typeof then == 'function') {
        const resolvePromise = (y: any) => {
          promiseResolveProcedure(promise2, y, resolve, reject)
        }
        const rejectPromise = (y: any) => {
          reject(y)
        }

        then.call(x, resolvePromise, rejectPromise)
      }
    } else {
      resolve(x)
    }
  } catch (err) {
    reject(err)
  }
}
