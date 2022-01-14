function twoSum(arr, target) {
  let i = 0, len = arr.length, map = new Map()
  for (; i < len; i++) map.set(arr[i], i)
  console.log('[map]:', map)
  i = 0
  for (; i < len; i++) {
    let tmpKey = target - arr[i], diff = map.has(tmpKey), tmpVal = map.get(tmpKey)
    if (diff && tmpVal !== i) return [map.get(arr[i]) + 1, tmpVal + 1]
  }
  return [null, null]

  // 两次循环，一次进行map构造，一次进行计算
  // 其实可以用一次循环即可，看twoSum2
}

function twoSum2(arr, target) {
  let i = 0, len = arr.length, map = new Map()
  for (; i < len; i++) {
    map.set(arr[i], i)

    let tmpKey = target - arr[i], diff = map.has(tmpKey), tmpVal = map.get(tmpKey)
    if (diff && tmpVal !== i) return [map.get(arr[i]) + 1, tmpVal + 1]
  }
  return [null, null]
}

let arr = [3, 2, 4, 5, 9], target = 6
console.log('[res]:', twoSum(arr, target))
console.log('[res2]:', twoSum2(arr, target))