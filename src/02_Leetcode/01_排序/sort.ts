// 冒泡排序

export function bubble(arr: number[]) {
  const len = arr.length

  for (let i = 0; i < len; ++i) {
    // max at tail
    for (let j = 0; j < len - i - 1; ++j) {
      if (arr[j + 1] < arr[j]) {
        swap(arr, j + 1, j)
      }
    }
    // max at head
    // for (let j = len - i; j > 0; --j) {
    //   // max = Math.max(max, arr[j])
    //   if (arr[j] > arr[j - 1]) {
    //     swap(arr, j, j - 1)
    //   }
    // }
    // result.push(max)
  }

  return arr
}

function swap(arr: number[], i: number, j: number) {
  let tmp = arr[i]
  arr[i] = arr[j]
  arr[j] = tmp
}
