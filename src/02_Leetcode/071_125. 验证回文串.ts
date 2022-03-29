function isPalindrome(s: string): boolean {
  const reg = /[^a-zA-Z0-9]/g

  s = s.replace(reg, '').toLowerCase()

  let left = 0,
    right = s.length - 1
  while (left < right) {
    const charL = s.charAt(left)
    const charR = s.charAt(right)

    if (!charL || !charR) {
      return false
    }

    if (charL != charR) {
      return false
    }

    left++
    right--
  }

  return true
}

function main() {
  // const s = 'A man, a plan, a canal: Panama'
  const s = 'race a car'

  console.log('[]:', isPalindrome(s))
}

main()

export {}
