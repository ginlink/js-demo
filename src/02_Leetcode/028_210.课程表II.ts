function main() {
  // const numCourses = 4
  // const prerequisites = [
  //   [1, 0],
  //   [2, 0],
  //   [3, 1],
  //   [3, 2],
  // ]
  // const numCourses = 2
  // const prerequisites = []
  const numCourses = 3
  const prerequisites = [
    [1, 0],
    [1, 2],
    [0, 1],
  ]

  console.log('[]:', findOrder(numCourses, prerequisites))
  console.log('[]:', findOrder111(numCourses, prerequisites))
}

main()

function findOrder(numCourses: number, prerequisites: number[][]): number[] {
  let res = []

  // 计算入度和关系
  // 这里的关系是 依赖课程: [课程1，课程2]，也就是指课程1和2依赖于依赖课程
  const inDeeps = new Array(numCourses).fill(0)
  const relationship: {
    [key: number]: number[]
  } = {}
  for (let i = 0; i < prerequisites.length; ++i) {
    const value = prerequisites[i][0]
    const dep = prerequisites[i][1]

    inDeeps[value]++

    if (relationship[dep]) {
      relationship[dep].push(value)
    } else {
      relationship[dep] = [value]
    }
  }

  // 生成队列
  const queue = []
  for (let i = 0; i < inDeeps.length; ++i) {
    // 只需要入度为0的，因为这是开始条件，注意queue中放的是课程编号
    if (inDeeps[i] == 0) queue.push(i)
  }

  console.log('[queue]:', queue)
  // 开始广度优先搜索
  while (queue.length) {
    const dep = queue.shift()
    res.push(dep)

    // 后续的课程
    const courses = relationship[dep]
    for (let i = 0; courses && i < courses.length; ++i) {
      const course = courses[i]

      // 向后推进
      const depAfter = --inDeeps[course]
      if (depAfter == 0) {
        queue.push(course)
      }
    }
  }

  // 结果的数量，一定与总课程数一致
  return res.length == numCourses ? res : []
}
function findOrder111(numCourses: number, prerequisites: number[][]): number[] {
  let classes = new Array(numCourses).fill(0) //存放入度数组
  let hash = {} //哈希表
  for (let i = 0; i < prerequisites.length; i++) {
    classes[prerequisites[i][0]]++ //计算入度
    if (hash[prerequisites[i][1]]) {
      hash[prerequisites[i][1]].push(prerequisites[i][0])
    } else {
      let cur = []
      cur.push(prerequisites[i][0])
      hash[prerequisites[i][1]] = cur
    }
  }
  let queue = [] //入度为0的队列
  for (let i = 0; i < classes.length; i++) {
    if (classes[i] == 0) {
      queue.push(i)
    }
  }

  console.log('[queue]:', queue)
  let result = []
  while (queue.length) {
    //当入度队列为空，停止循环
    let cur = queue.shift()
    result.push(cur)
    let toQueue = hash[cur] //依赖该课程的课程数组
    if (toQueue && toQueue.length) {
      for (let i = 0; i < toQueue.length; i++) {
        classes[toQueue[i]]-- //入度减1
        if (classes[toQueue[i]] == 0) {
          queue.push(toQueue[i]) //入队
        }
      }
    }
  }
  return result.length == numCourses ? result : []
}
