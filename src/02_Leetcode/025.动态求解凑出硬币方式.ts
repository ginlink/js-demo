function main() {
  const coinFace = [1, 5, 11]
  const w = 16

  console.log('[]:', coinWaysNum(coinFace, w))
  console.log('[]:', coinWaysNum111(coinFace, w))
}

main()

function coinWaysNum(coinFace: number[], w: number): number {
  const fn = [0]

  for (let i = 1; i <= w; ++i) {
    let cost = Infinity

    for (let j = 0; j < coinFace.length; ++j) {
      if (i - coinFace[j] >= 0) cost = Math.min(cost, fn[i - coinFace[j]] + 1)
    }

    console.log(`[cost${i}]:`, cost)
    fn[i] = cost
  }

  return fn[w]
}
function coinWaysNum111(coinFace: number[], w: number): number {
  if (w < 1) return undefined

  let minF = new Array(w).fill(0)

  for (let i = 1; i <= w; ++i) {
    let cost = Infinity

    if (i - 1 >= 0) cost = Math.min(cost, minF[i - 1] + 1)
    if (i - 5 >= 0) cost = Math.min(cost, minF[i - 5] + 1)
    if (i - 11 >= 0) cost = Math.min(cost, minF[i - 11] + 1)

    minF[i] = cost
  }

  console.log('[]:', minF)

  return minF[w]
}
