Array.prototype.slice1 = function (start, end) {
  // 这里不能写成箭头函数，因为this作用域问题
  let len = this.length, tmp = []

  let l = (start === undefined) ? 0 : (start < 0) ? Math.max(len + start, 0) : Math.min(start, len)
  let r = (end === undefined) ? len : (end < 0) ? Math.max(len + end, 0) : Math.min(end, len)
  // max()和min()是为了保证安全的访问数据，也就是允许犯错一次，但第二次再犯错，就限制你。
  // 这也是slice与substring最大的区别，substring不允许犯错。

  // 注意，此处必为不等形式，否则无法满足左开右闭，
  // 所以上面end===undefined的时候，就只能取len了
  while (l < r) tmp.push(this[l++])
  return tmp
}

let tmp = [1, 2, 3, 4, 5]
console.log('[res]:', tmp.slice1(0, -2))