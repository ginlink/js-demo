import { arr2tree2 } from './common/utils'

class TreeNode {
  //   int val;
  //  *     TreeNode *left;
  //  *     TreeNode *right;
  //  *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
  //  *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
  //  *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}

  val: number
  left: TreeNode | null = null
  right: TreeNode | null = null

  constructor(val: number, left: TreeNode | null, right: TreeNode | null) {
    this.val = val
    this.left = left
    this.right = right
  }
}
class TreeNode111 {
  val: number
  left: TreeNode | null = null
  right: TreeNode | null = null

  constructor(val: number) {
    this.val = val
  }
}

function crateTree(arr: (number | null)[]) {
  const root = new TreeNode(
    3,
    new TreeNode(9, null, null),
    new TreeNode(20, new TreeNode(15, null, null), new TreeNode(7, null, null))
  )

  return root
}

function main() {
  // const root = [3, 9, 20, null, null, 15, 7]
  // const root = crateTree([])
  // const root = arr2tree([3, 9, 20, null, null, 15, 7])
  // const root = arr2tree([1])
  const root = arr2tree2([1, 2, 3, 4, 5, 6, 7, 8, 9])

  console.log('[root]:', root)

  inOrderTraverse(root)

  // const res = levelOrder(root)
  // console.log('[res]:', res)
}

main()

function levelOrder(root: TreeNode | null) {
  if (root == null) return []

  const queue: (TreeNode | null)[] = []
  const res: number[][] = []

  queue.unshift(root)

  while (queue.length > 0) {
    const len = queue.length

    const layer: number[] = []
    for (let i = 0; i < len; ++i) {
      const el = queue.pop()
      layer.push(el.val)

      if (el.left != null) {
        queue.unshift(el.left)
      }
      if (el.right != null) {
        queue.unshift(el.right)
      }
    }

    res.push(layer)
  }

  return res
}

function inOrderTraverse(root: TreeNode111 | null) {
  if (root == null) {
    return
  }

  console.log('[]:', root.val)
  inOrderTraverse(root.left)
  inOrderTraverse(root.right)
}
