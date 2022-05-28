const MAX_DELAY = 3001
const mkPromise = (id, delay) => {
  // return _mkPromise(id, delay)
  // return Promise.race([_mkPromise(id, delay), _racePromise()])
  return Promise.race([
    _mkPromise(id, delay),
    new Promise((re) => {
      setTimeout(() => {
        re('超时了')
      }, MAX_DELAY)
    }),
  ])

  function _mkPromise(id, delay) {
    return new Promise((re, rj) => {
      const msg = `我是ID为 ${id} 的定时器，delay为 ${delay}`

      setTimeout(() => {
        // if (id == 3)
        //   rj('[err:]' + msg)
        // else
        //   re(msg)

        re(msg)
      }, delay)
    })
  }
}

function main() {
  // let tmpArr = [
  //   mkPromise(1, 1000),
  //   mkPromise(2, 2000),
  //   mkPromise(3, 3000),
  //   mkPromise(4, 4000),
  //   mkPromise(5, 5000),
  // ]
  console.time('aaa')

  const tmpArr = [mkPromise(1, 5000), mkPromise(2, 4000), mkPromise(3, 3000), mkPromise(4, 2000), mkPromise(5, 1000)]
  // console.log('[tmpArr]:', tmpArr)
  // return

  console.log('[]:', typeof tmpArr[0])
  console.log('[]:', tmpArr[0])
  // tmpArr[0].then((res) => {
  //   console.log('[res]:', res)
  // })

  Promise.all(tmpArr)
    .then((res) => {
      console.log('[res]:', res)
    })
    .catch((err) => {
      console.log('[err]:', err)
    })

  console.timeEnd('aaa')
}

main()
