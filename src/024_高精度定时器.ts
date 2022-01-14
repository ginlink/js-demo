/**
  [delay](offset): 7
  [delay](offset): 14
  [delay](offset): 6
  [delay](offset): 7
  [delay](offset): 6
  [delay](offset): 5
  [delay](offset): 6
  [delay](offset): 6
 */

function highSetTimeout() {
  const interval = 1000
  const serverOffset = 100 //server - local
  let lastTime = new Date().getTime() + serverOffset + interval
  step(interval)

  function step(delay) {
    setTimeout(() => {
      const offset = new Date().getTime() + serverOffset - lastTime
      console.log('[delay](offset):', offset)

      lastTime += interval
      // remove offset
      step(Math.max(0, interval - offset))
    }, delay)
  }
}

highSetTimeout()
