function addBinary(a: string, b: string): string {
  const lenA = a.length,
    lenB = b.length
  let max = 0

  if (lenA > lenB) {
    max = lenA
    b = b.padStart(lenA, '0')
  } else {
    max = lenB
    a = a.padStart(lenB, '0')
  }

  let carry = 0,
    ans = ''
  for (let i = max - 1; i >= 0; --i) {
    const sum = carry + Number(a.charAt(i)) + Number(b.charAt(i))
    ans = String(sum % 2) + ans

    carry = Math.floor(sum / 2)
  }

  return carry == 0 ? ans : String(carry) + ans
}

function main() {
  const a = '11',
    b = '1'
  // const a = '1010',
  //   b = '1011'

  console.log('[]:', addBinary(a, b))
}

main()
