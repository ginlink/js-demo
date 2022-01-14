function run() {
  let base = 1000
  let green = new Promise((re, rj) => {
    setTimeout(() => {
      console.log('[红灯]:')
      re()
    }, 1 * base);
  })
  let red = new Promise((re, rj) => {
    setTimeout(() => {
      console.log('[黄灯]:')
      re()
    }, 1 * base);
  })
  let yellow = new Promise((re, rj) => {
    // setTimeout(() => {
    //   console.log('[绿灯]:')
    //   // re()
    // }, 1 * base);
  })

  setTimeout(() => {
    console.log('[yellow]:', yellow)
  }, 2000);
  return

  loop(green, red, yellow)
  // loop1()

  async function loop(green, red, yellow) {
    let i = 0
    while (i < 5) {
      await green;
      await yellow;
      await red;

      console.log('[green]:', green)
      console.log('[yellow]:', yellow)
      console.log('[red]:', red)
      console.log('[111111111]:',)
      i++
    }
  }
  async function loop1() {
    while (true) {
      await pro('红灯', 1 * base);
      await pro('黄灯', 1 * base);
      await pro('绿灯', 1 * base);
    }
  }
  function pro(val, delay) {
    return new Promise(re => {
      setTimeout(() => {
        console.log(`[${val}]:`, '')
        re()
      }, delay);
    })
  }
}

function run2() {
  let base = 1000
  let green = Promise.resolve().then(() => {
    setTimeout(() => {
      console.log('[绿灯]:', '6秒')
    }, 1 * base);
  })
  let red = Promise.resolve().then(() => {
    setTimeout(() => {
      console.log('[绿灯]:', '6秒')
    }, 1 * base);
  })
  let yellow = Promise.resolve().then(() => {
    setTimeout(() => {
      console.log('[绿灯]:', '6秒')
    }, 1 * base);
  })

  console.log('[yellow]:', yellow)
  setTimeout(() => {
    console.log('[yellow]:', yellow)
  }, 2000);
  return

  // while (true){
  // console.log('[111]:',)
  loop(green, red, yellow)
  // }

  async function loop(green, red, yellow) {
    while (true) {
      await green;
      await yellow;
      await red;
    }
  }
}



// run()
// run2()
let flag = true
// run3()
run4()

// setTimeout(() => {
  // 停止轮训
  // stop()
// }, 5000);

async function run3() {
  while (flag) {
    await createLight('红灯', 1000)
    console.log('[111]:', )
    await createLight('黄灯', 1000)
    await createLight('绿灯', 2000)
    await createLight('黄灯', 1000)
  }
}

function stop() {
  flag = false
}

function createLight(val, delay) {
  return new Promise(re => {
    setTimeout(() => {
      console.log(`当前是${val}，${val}时间${delay}`)
      // re()
    }, delay)
  })
}

async function run4() {
  // await等一个没有结果的promise
  await new Promise(re => { })
  console.log('[111]:', )
}