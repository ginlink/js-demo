function isPalindrome(x: number): boolean {
  const numStr = x.toString()
  let l = 0,
    r = numStr.length - 1

  while (l < r) {
    if (numStr[l] !== numStr[r]) {
      return false
    }

    ++l
    --r
  }

  return true
}

function isPalindrome111(x: number): boolean {
  const oldStr = x.toString()
  const newStr = Array.from(oldStr).reverse().join('')

  return oldStr == newStr
}

function isPalindrome222(x: number): boolean {
  // boundary
  // 1.A negative number
  // 2.0 is not in the end
  if (x < 0) {
    return false
  }

  // const len = x.toString().length
  let ori = x,
    curr = 0

  // 1221
  while (true) {
    const tail = ori % 10
    curr += tail
    ori = Math.floor(ori / 10)

    // 0 can not be in the end
    if (curr == 0 && tail == 0) {
      break
    }

    if (curr >= ori) {
      break
    }

    curr *= 10
  }

  // if (len % 2 == 0) {
  //   return ori == curr
  // } else {
  //   return ori == Math.floor(curr / 10)
  // }

  return ori == curr || ori == Math.floor(curr / 10)
}

function main() {
  const x = 121
  // const x = -121
  // const x = 10
  // const x = 11

  console.log('[]:', isPalindrome(x))
  console.log('[]:', isPalindrome111(x))
  console.log('[]:', isPalindrome222(x))
}

main()

export {}
