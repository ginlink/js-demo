function sleep1(delay) {
  let start = new Date().getTime(), now = 0
  while (true) {
    if (now >= delay) break
    now = new Date().getTime() - start
  }
}
function sleep2(delay) {
  return new Promise(re => {
    setTimeout(() => {
      re()
    }, delay)
  })
}

async function main() {

  console.time('aaa')
  // sleep1(2000)
  await sleep2(2000)
  console.timeEnd('aaa')
}

main()