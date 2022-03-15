import { arr2tree, TreeNode } from './common/utils'

function isSymmetric(root: TreeNode | null): boolean {
  return check(root.left, root.right)

  function check(left: TreeNode, right: TreeNode): boolean {
    if (left === null && right === null) {
      return true
    }
    if (left === null || right === null) {
      return false
    }

    return left.val === right.val && check(left.left, right.right) && check(left.right, right.left)
  }
}

function isSymmetric111(root: TreeNode): boolean {
  const queue: TreeNode[] = []

  queue.push(root)
  queue.push(root)

  while (queue.length > 0) {
    const t1 = queue.shift()
    const t2 = queue.shift()

    if (t1 === null && t2 === null) {
      continue
    }

    if (t1 === null || t2 === null || t1.val !== t2.val) {
      return false
    }

    // if (t1.val !== t2.val) {
    //   return false
    // }

    queue.push(t1.left)
    queue.push(t2.right)
    queue.push(t1.right)
    queue.push(t2.left)
  }

  return true
}

function main() {
  // const root = arr2tree([1, 2, 2, 3, 4, 4, 3])
  // const root = arr2tree([1, 2, 2, null, 3, null, 3])
  const root = arr2tree([9, -42, -42, null, 76, 76, null, null, 13, null, 13])

  console.log('[root]:', root)

  console.log('[]:', isSymmetric(root))
  console.log('[]:', isSymmetric111(root))
}

main()

export {}
