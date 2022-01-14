// 输入
// I am a developer
// 输出
// developer a am I

function translate(str) {
  // split函数
  return str.split(' ').reverse().join(' ')
}
function translateRegEx(str) {
  // 正则
  return str.match(/(\w)+/g).reverse().join(' ')
}

let str = 'I am a developer'
// console.log('[]:', translate(str))
console.log('[]:', translateRegEx(str))