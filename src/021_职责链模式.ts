/***
 * 职责链模式：我不知道谁知道答案，我希望我的请求
 * 在每一个人都走一遍，直到有人能够告诉我答案
 */

/***
 * TODO 分析order为什么拿到的是链头，而且为什么that会执行多次
 */

function main21() {

  // 注意不要用箭头函数，否则this指向全局，很奇怪而不是指向undefined
  Function.prototype.after = function(fn: Order): Order {
    const that: Order = this

    return (type:number, pay: boolean, leftNum: number)=>{
      const ret = that(type, pay, leftNum)
      console.log('[that]:', that, ret)

      console.log('[执行了]:', )

      if(ret === 'nextSuccessor'){
        return fn.call(that, type, pay, leftNum)
      }

      return ret
    }
  }

  const order500: Order = (type:number, pay: boolean, leftNum: number)=>{
    console.log('[order500]:', )
    if(type===500){
      console.log(`500元级别，类别${type}， 是否支付${pay}， 剩余数量${leftNum}`)
      return false
    }

    return 'nextSuccessor'
  }

  const order300: Order = (type:number, pay: boolean, leftNum: number)=>{
    console.log('[order300]:', )
    if(type===300){
      console.log(`300元级别，类别${type}， 是否支付${pay}， 剩余数量${leftNum}`)
      return false
    }

    return 'nextSuccessor'
  }
  const order200: Order = (type:number, pay: boolean, leftNum: number)=>{console.log('[order200]:', )
    if(type===200){
      console.log(`200元级别，类别${type}， 是否支付${pay}， 剩余数量${leftNum}`)
      return false
    }

    return 'nextSuccessor'
  }
  const orderNormal: Order = (type:number, pay: boolean, leftNum: number)=>{
    console.log('[orderNormal]:', )
    if(type===0){
      console.log(`普通级别，类别${type}， 是否支付${pay}， 剩余数量${leftNum}`)
      return false
    }

    return 'nextSuccessor'
  }
  
  
  // const order = order500.after(order300).after(order200).after(orderNormal)
  const order = order500.after(order300).after(order200)
  order(500, true, 1)
}
main21()