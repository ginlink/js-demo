// 输入
// let str='{()}'
// =>true
// str='{([[]])}'
// =>true
// str='[{(]}]'
// =>false

function match_brkt(str) {
  let ans = 0, stack = [], i = 0, len = str.length

  for (; i < len; i++) {

    switch (str[i]) {
      case '{':
      case '[':
      case '(':
        stack.push(str[i])
        break

      case '}':
        if (stack[stack.length - 1] === '{') stack.pop()
        break
      case ']':
        if (stack[stack.length - 1] === '[') stack.pop()
        break
      case ')':
        if (stack[stack.length - 1] === '(') stack.pop()
        break
    }

    console.log('[stack]:', stack)

  }
  ans = stack.length
  return ans === 0
}

let str = '{(]}'
str = '{()}'

console.log('[match_brkt]:', match_brkt(str))