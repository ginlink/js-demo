// let arr=[1,4,6,-55,77,-333,456,-72]
// 写出累计求和最大的值


function sumMax(arr) {
  let ans, len = arr.length, times=0

  ans = arr[len-1]
  // 结果初始值

  while(len>0){
    rec(arr, 0)
    len--
  }

  function rec(arr, i) {
    times++
    if (i === len-1) return ans = arr[i]>ans?arr[i]:ans

    rec(arr, i + 1)

    // 尝试扩大
    let tmpArr = arr.slice(i, len)

    let tmpAns = tmpArr.reduce((prev, curr) => {
      return prev + curr
    })

    console.log('[ans]:', ans)
    ans = tmpAns > ans ? tmpAns : ans
  }

  console.log('[times]:', times)
  return ans
}

let arr = [1, 4, 6, -55, 77, -333, 456, -72]
arr.reverse()
console.log('[res]:', sumMax(arr))

arr = [1,2,3,4,5,6,7,8]
console.log('[acc]:', arr.reduce((prev,curr)=>{
  return prev+curr
}))