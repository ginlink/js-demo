// 查找最大不重复子串长度
// 关键字：查找(遍历)，不重复(集合)
// 难度：***
// abcabcbb
// 尝试a开始a-c 长度3
// 尝试b开始b-a 长度3
// 尝试c开始c-b 长度3
// 尝试a开始a-c 长度3

// 
// 方法二：滑动窗口
// 'abcabcbb'
// 关键点：1集合 2滑动
var lengthOfLongestSubstring2 = function (s) {
  let len = s.length, occ = new Set(), rk = 0, ans = 0
  // 关键点1：occ为一个集合，主要作用是一个储存器(不重复)，
  //    验证是否存在该元素。

  for (let i = 0; i < len; i++) {
    if (i != 0) {
      occ.delete(s.charAt(i - 1))
      // 关键点2：向前滑动
    }

    while (rk < len && !occ.has(s.charAt(rk))) {
      occ.add(s.charAt(rk))
      rk++
    }
    ans = Math.max(ans, rk - i)
  }

  return ans
}

// 'abcabcbb'
// 上次复习时间：2021-5-9 20:28:34
// 上次复习时间：2021-5-16 13:39:34
function lengthOfLongestSubstring22(str) {
  let i=0,j=0,occ=new Set(),len=str.length,ans=0
  
  for(; i<len; i++){
    if(i!==0) occ.delete(str[i-1]);
    // 删除前一个元素，滑动起来
    while(j<len && !occ.has(str[j])) occ.add(str[j++])

    ans=Math.max(ans,occ.size)
  }
  return ans
}

// 滑动窗口升级版，直接让左直接放到右指针的未知，
// 目前发现并不能实现，该方法有问题
// 'abcabcbb'
var lengthOfLongestSubstring3 = function (s) {
  let len = s.length, occ = new Set(), rk = 0, ans = 0

  for (let i = 0; i < len; i++) {
    if (i != 0) {
      // occ.delete(s.charAt(i - 1))
      occ.clear()
    }

    while (rk < len && !occ.has(s.charAt(rk))) {
      occ.add(s.charAt(rk))
      rk++
    }
    ans = Math.max(ans, rk - i)

    i = rk
  }

  return ans
}
let s = 'abcabcbb'
// s = 'bbbbb'
// s = "pwwkew"
// s = ""

console.log('[s:]', s)
// console.log('[res1]:', lengthOfLongestSubstring1(s))
// 最优方案：滑动窗口
console.log('[res2]:', lengthOfLongestSubstring2(s))
console.log('[res22]:', lengthOfLongestSubstring22(s))
// console.log('[res3]:', lengthOfLongestSubstring3(s))