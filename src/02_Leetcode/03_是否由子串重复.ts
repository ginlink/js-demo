
// let origin = 'abcabcabc'
// 尝试a    失败；
// 尝试ab   失败；
// 尝试abc  成功
// 总结：遍历扩大，递归查找

// let origin = 'aaabbb'
function repeat3(o) {
  let i = 0, j = 1, len = o.length, ans = false
  while (j < len) {
    // 注意点1：如果j<len，j的最大值为len-1，此时slice(0, len-1)取到的数组并
    // 不包含最后一个元素，这样正好符合题意，a不成立，ab不成立，abc不成立
    // 里面进行递归尝试
    let sub = o.slice(i, j), step = j - i
    if ((len % sub.length) === 0) ans = rec(o, sub, i, j, step)
    // 注意点2：如果递归依赖第三函数，那么就需要拿一个容器去盛放结果
    // 如果递归本身就直接可以return

    if (ans) return ans // 如果有了答案，就返回吧，否则一直扩大范围
    j++
  }
  return false
  // 都遍历完了，还没有结果

  // 无非就是判断是否由一个子串重复组成
  function rec(o, sub, i, j, step) {
    i += step, j += step // 挪到下一个子串位置
    if (j > len) return false
    // 防止j溢出，出现无限递归
    // 注意点3：j的值她作为右边界，她的值正好是右边界索引加1，因为
    // 她的起始值为1

    let newSub = o.slice(i, j)
    console.log('[观测值]:', sub, newSub, i, j, len)
    if (sub === newSub) {
      if (j === len) return true
      // 成功条件，所有的子串都尝试一边后，发现都相等
      else return rec(o, sub, i, j, step)
    }
    else return false // 如果不等，那么失败，扩大范围再试
  }
}

// 最后一次练习时间：2021-5-16 13:14:52
// let origin = 'abcabcabc'
function repeat4(str) {
  let i=1,len=str.length,sub='',ans=false
  for(; i<len; i++){
    sub=str.slice(0,i)
    ans=isRepeat(str,sub)
    if(ans) return ans
  }
  return ans

  function isRepeat(str,sub) { 
    let len1=str.length,len2=sub.length
    if(len1%len2!==0) return false
    // 1%0=NaN，所以如果len2为0，也会返回false
    
    for(let i=0; i<len1; i+=len2){
      if(str.slice(i,i+len2) !== sub) return false
    }
    return true
    // return arr.indexOf(sub) !== -1
  }
}


let origin = 'abcabcabcd'
origin = 'aaa'
// origin = 'abcabcabd'
// origin = 'abc'
// origin = 'aa'
// origin = 'a'

origin = 'aaabbb'
// 这种情况不适应，本来就不应该适应，她不重复
// console.log('[repeat]:', repeat(origin))
// console.log('[repeat2]:', repeat2(origin))
console.log('[repeat3]:', repeat3(origin))
console.log('[repeat4]:', repeat4(origin))