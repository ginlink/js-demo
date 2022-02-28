function main() {
  const coinFace = [1, 5, 11]
  const w = 15

  console.log('[]:', coinWaysNum(coinFace, w))
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
