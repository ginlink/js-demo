function binary_search(key, arr) {
  let lo = 0,
    hi = arr.length - 1
  while (lo <= hi) {
    console.log('[lo]:', lo)
    console.log('[hi]:', hi)

    const mid = Math.floor((lo + hi) / 2)
    if (key > arr[mid]) lo = mid + 1
    else if (key < arr[mid]) hi = mid - 1
    else return mid
  }
  return -1
}

const arr = [1, 2, 4, 5, 6, 7, 8, 9, 11],
  key = 11
console.log('[res]:', binary_search(key, arr))
