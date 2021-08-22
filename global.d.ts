/**
 * 放入自己声明的类型
 */

// global.d.ts文件无法导出类型，否则其他文件找不到类型声明
// 其他文件直接可以获取到Order声明，不用导出

type Order = (type:number, pay: boolean, leftNum: number)=> boolean | string
type OrderFunc =  (fn: Order) => Order

interface Function {
  after: OrderFunc
  
}