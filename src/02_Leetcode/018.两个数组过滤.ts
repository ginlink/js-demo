
const filterHas = (originArr: number[], targetArr: number[])=> {
  return originArr.filter((item: number)=> targetArr.indexOf(item) == -1)
}

const main = ()=> {
  const originArr = [1,2,3,4,5]
  const targetArr = [1,2]

  const res = filterHas(originArr, targetArr)
  console.log('[res]:', res)
}



main()

// console.log('[()]:', [].filter((e:any)=>{}))
// 返回空数组