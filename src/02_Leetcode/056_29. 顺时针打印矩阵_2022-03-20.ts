function spiralOrder(matrix: number[][]): number[] {
  if (matrix.length <= 0) return []

  const rowLen = matrix.length
  const columnLen = matrix[0].length

  const res = []
  let l = 0,
    r = columnLen - 1,
    t = 0,
    b = rowLen - 1

  while (true) {
    for (let i = l; i <= r; ++i) {
      res.push(matrix[t][i])
    }
    if (++t > b) break

    for (let i = t; i <= b; ++i) {
      res.push(matrix[i][r])
    }
    if (--r < l) break

    for (let i = r; i >= l; --i) {
      res.push(matrix[b][i])
    }
    if (--b < t) break

    for (let i = b; i >= t; --i) {
      res.push(matrix[i][l])
    }
    if (++l > r) break
  }

  return res
}

function main() {
  // const matrix = [
  //   [1, 2, 3],
  //   [4, 5, 6],
  //   [7, 8, 9],
  // ]
  const matrix = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
  ]

  console.log('[]:', spiralOrder(matrix))
}

main()

export {}
