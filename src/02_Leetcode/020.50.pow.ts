// 题目：实现 pow(x, n) ，即计算 x 的 n 次幂函数。

function main() {
  const x = 2
  const n = 10

  const res = myPow(x, n)

  console.log('[res]:', res)
  // [res]: 1024
}
main()

function myPow(x: number, n: number) {
  return n >= 0 ? quickMul(x, n) : 1 / quickMul(x, -n)
}

function quickMul(x: number, n: number) {
  n = Math.floor(n)
  if (n == 0) {
    return 1
  }
  console.log('[x, n]:', x, n)
  // [x, n]: 2 10
  // [x, n]: 2 5
  // [x, n]: 2 2
  // [x, n]: 2 1
  // [res]: 1024

  const y = quickMul(x, n / 2)
  return n % 2 == 0 ? y * y : y * y * x
}
