function isPalindrome(s: string): boolean {
  const reg = /[^a-zA-Z0-9]/g

  s = s.replace(reg, '').toLowerCase()

  let left = 0,
    right = s.length - 1
  while (left < right) {
    const charLeft = s.charAt(left)
    const charRight = s.charAt(right)
    if (!charLeft || !charRight || charLeft != charRight) {
      return false
    }

    left++
    right--
  }

  return true
}

function main() {
  const s = 'A man, a plan, a canal: Panama'
  // const s = 'race a car'

  console.log('[]:', isPalindrome(s))
}

main()

export {}
