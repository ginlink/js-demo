
// 对给定两个二进制文本进行求和
// 难度：***
// 输入：let str1 = "11", str2 = "1"
// 输出：100
// 关键点：1进位法

// 逆向双指针进位法
function sum2(str1, str2) {
  let ca = 0, ans = []
  for (let i = str1.length - 1, j = str2.length - 1; i >= 0 || j >= 0; i--, j--) {
    let sum = ca
    // 解决str1和str2长度不一的问题
    sum += (i >= 0) ? parseInt(str1[i]) : 0
    sum += (j >= 0) ? parseInt(str2[j]) : 0
    ans.push(sum % 2)
    ca = Math.floor(sum / 2)
  }

  if (ca > 0) ans.push(ca)

  return ans.reverse().join('')
}

// let str1 = "11", str2 = "1"
function sum22(a, b) {
  let len1 = a.length, len2 = b.length, i = len1 - 1, j = len2 - 1, ca = 0, ans = []

  for (; i >= 0 || j >= 0; i--, j--) {
    let sum = ca
    sum += (i >= 0) ? parseInt(str1[i]) : 0
    sum += (j >= 0) ? parseInt(str2[j]) : 0

    // let a = parseInt(str1[i]), b = parseInt(str2[j])
    // sum += (i >= 0) ? a : 0
    // sum += (j >= 0) ? b : 0

    ans.push(sum % 2)
    ca = Math.floor(sum / 2)
  }
  if (ca) ans.push(ca)

  return ans.reverse().join('')
}

let str1 = "11", str2 = "1"
str1 = "1010", str2 = "101111"
// str1 = "1010101010101111", str2 = "101111111111111111111111111"
str1 = createBin(100000), str2 = createBin(10000000)

// console.time('res2')
// sum2(str1, str2)
// // console.log('[res2]:', sum2(str1, str2))
// // console.log('[res2]:', sum22(str1, str2))
// console.timeEnd('res2')

console.time('res22')
sum22(str1, str2)
// console.log('[res2]:', sum2(str1, str2))
// console.log('[res2]:', sum22(str1, str2))
console.timeEnd('res22')

function createBin(num = 100) {
  let tmp = []
  for (let i = 0; i < num; i++) {
    let item = Math.floor(Math.random() * 2)
    tmp.push(item)
  }
  return tmp.join('')
}