function leftRightBracket(n) {
  const res = []

  /**
   * 条件：
   *    左括号随意放，但数量不能超过n
   *    左括号数量> 右括号
   */
  _rec(0, 0, n, '')
  function _rec(left, right, n, s) {

    // terminator
    if (left == n && right == n) {
      console.log(s)
      return
    }

    // process current logic

    // drill down
    if (left <= n)
      _rec(left + 1, right, n, s + '(')

    if (left > right && right <= n)
      // right一定小于n，因为left的来源只可能小于n
      _rec(left, right + 1, n, s + ')')

    // reverse state
  }
  return res
}

console.log('[res]:', leftRightBracket(3))