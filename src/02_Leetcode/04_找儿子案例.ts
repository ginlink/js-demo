// 编程测试题
// 从数据库中取出了一个数组，它表示的是一个树型数据结构，数组的每个元素中有个fatherId字段指向父结点的id属性，用JSON格式表示如下：
// [
//     {"id":1},
//     {"id":2, "fatherId":1},
//     {"id":3, "fatherId":2},
//     {"id":4, "fatherId":1}
// ]
// 现在请你编写一个函数makeTree，通过转换，返回如下的树型结构：
// [
//     {"id":1, "children": [
//         {"id":2, "fatherId":1, "children": [
//             {"id":3, "fatherId":2},
//         ]},
//         {"id":4, "fatherId":1}
//     ]},
// ]
// 难度：***
// 关键点：1区分父亲和儿子 2儿子找儿子

const utils = require('./common/utils')
function makeTree(arr) {
  let parent = null, children = null

  // parent.push(arr[0])
  // children = arr.slice(1)

  parent = arr.filter(item => {
    return item.id === 1
  })
  children = arr.filter(item => {
    return item.id !== 1
  })

  console.log('[children]:', children)
  console.log('[parent]:', parent)

  rec(parent, children)
  function rec(p, c) {
    p.forEach(itemP => {
      c.forEach((itemC, index) => {

        if (itemC.fatherId === itemP.id) {
          if (itemP.children) itemP.children.push(itemC)
          else itemP.children = [itemC]

          // 接着下一层
          _c = JSON.parse(JSON.stringify(c))
          _c.splice(index, 1)

          rec([itemC], _c)
        }
      })
    });
  }

  return parent
}

// 找儿子案例
function makeTree2(arr) {
  let prt = arr.filter(item => {
    return item.id === 1
  })
  let cld = arr.filter(item => {
    return item.id !== 1
  })
  // 关键点1：区分所有父亲和儿子
  let times = 0

  rec(prt, cld)
  function rec(parent, children) {
    times++
    parent.forEach(p => {
      children.forEach((c, pos) => {

        // 父亲找儿子
        if (p.id === c.fatherId) {
          if (p.children) p.children.push(c)
          else p.children = [c]

          // 关键点2：儿子找儿子
          let _children = JSON.parse(JSON.stringify(children))
          _children.splice(pos, 1)
          rec([c], _children)
        }

        // 若采用此写法，会增加迭代次数，因为只有父亲找到儿子之后，
        // 才需要去找儿子的儿子
        // let _children = JSON.parse(JSON.stringify(children))
        // _children.splice(pos, 1)
        // rec([c], _children)
      })
    })
  }

  console.log('[times]:', times)
  return prt
}

// 上次复习时间：2021-5-9 20:27:49
function makeTree22(arr) {
  // 区分
  let parent,children;
  parent=arr.filter(item=>item.id===1)
  children=arr.filter(item=>item.id!==1)
  // filter如果条件为空则是留下来的
  // some有一个成立则成立

  console.log('[parent]:', parent)
  console.log('[children]:', children)

  // 找
  find(parent,children)

  function find(_parent,_children) { 
    _parent.forEach(itemP=>{
      _children.forEach((itemC,index)=>{
        if(itemP.id===itemC.fatherId){
          if(itemP.children) itemP.children.push(itemC)
          else itemP.children=[itemC]

          // 找寻儿子的儿子
          c_children=JSON.parse(JSON.stringify(_children))
          c_children.splice(index,1)

          find([itemC], c_children)
        }
      })
    })  
  }
  return parent
}

let arr = [
  { "id": 1 },
  { "id": 2, "fatherId": 1 },
  { "id": 3, "fatherId": 2 },
  { "id": 4, "fatherId": 1 },
  { "id": 5, "fatherId": 4 },
]

// console.log('[res]:', makeTree(arr))

const fs = require('fs')
// fs.writeFileSync('./output.json', JSON.stringify(makeTree(arr)))
// fs.writeFileSync('./output.json', JSON.stringify(makeTree2(arr)))
fs.writeFileSync('./output.json', JSON.stringify(makeTree22(arr)))

// 注意：
// 1.map中如果直接return，则返回的当前元素值为undefined
// 2.不要这样操作：_c = _c.splice(index, 1)
// 否则_c的值为splice删除的结果