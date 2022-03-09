export function binarySearch(s?: number[], t?: number): number {
  if (s.length < 1 || t === undefined) return -1

  // To ensure an orderly
  // make sure there is a compare function
  s.sort((a, b) => a - b)

  let l = 0,
    r = s.length - 1

  while (l < r) {
    const mid = Math.floor((l + r + 1) / 2)

    if (t === s[l] || t === s[r]) {
      return t === s[l] ? l : r
    }

    if (t === s[mid]) {
      return mid
    } else if (t > s[mid]) {
      l = mid + 1
    } else {
      r = mid
    }
  }

  return -1
}

function main() {
  const s = [2, 3, 5, 7, 11, 13, 17]
  const t = 11

  console.log('[]:', binarySearch(s, t))
}

main()
