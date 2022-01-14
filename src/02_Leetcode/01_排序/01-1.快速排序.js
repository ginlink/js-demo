function quickDo(nums) {
  quickSort(nums, 0, nums.length - 1)
  return nums

  function quickSort(nums, begin, end) {
    if (end <= begin) return

    let pivot = patition(nums, begin, end)
    quickSort(nums, begin, pivot - 1)
    quickSort(nums, pivot + 1, end)
  }

  function patition(arr, begin, end) {
    let pivot = end, counter = begin

    for (let i = begin; i < end; ++i) {
      if (arr[i] < arr[pivot]) {
        swap(arr, i, counter)
        counter++
      }
    }
    swap(arr, counter, pivot)
    return counter
  }

  function swap(arr, i, j) {
    let tmp = arr[i]
    arr[i] = arr[j]
    arr[j] = tmp
  }
}

let nums = [1, 2, 3, 9, 0, -2, 0, 1, 29]
console.log('[]:', quickDo(nums))