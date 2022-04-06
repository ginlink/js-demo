function addBinary(a: string, b: string): string {
  const len0 = a.length,
    len1 = b.length

  if (len0 == 0 && len1 == 0) {
    return ''
  }

  let max = 0
  if (len0 > len1) {
    b = b.padStart(len0, '0')
    max = len0
  } else {
    a = a.padStart(len1, '0')
    max = len1
  }

  let carry = 0,
    ans = ''
  for (let i = max - 1; i >= 0; --i) {
    const numA = Number(a.charAt(i))
    const numB = Number(b.charAt(i))

    const sum = carry + numA + numB

    const val = sum % 2
    ans = val + ans

    carry = Math.floor(sum / 2)
  }

  if (carry != 0) {
    ans = carry + ans
  }

  return ans
}

function main() {
  // const a = '11',
  //   b = '1'
  const a = '1010',
    b = '1011'

  console.log('[]:', addBinary(a, b))
}

main()

export {}
