function isPalindrome222(x: number): boolean {
  // boundary
  // x must not be a negative number
  // 0 not be in the end

  // attention
  // float number
  if (x < 0) {
    return false
  }

  let ori = x,
    curr = 0

  while (true) {
    const tail = ori % 10
    curr += tail
    ori = Math.floor(ori / 10)

    // 0 not be in the end
    if (curr == 0 && tail == 0) {
      break
    }

    if (curr >= ori) {
      break
    }

    curr *= 10
  }

  return curr == ori || Math.floor(curr / 10) == ori
}

function main() {
  // const x = 121
  // const x = -121
  const x = 10
  // const x = 11

  console.log('[]:', isPalindrome222(x))
}

main()

export {}
