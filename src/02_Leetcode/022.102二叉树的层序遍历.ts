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

// Optimize array to binary tree
function arr2tree(arr: (number | null)[]) {
  if (arr[0] == null) return null

  const queue: (TreeNode | null)[] = []
  const root = new TreeNode111(arr[0])

  queue.unshift(root)

  let isLeft = true
  for (let i = 1; i < arr.length; ++i) {
    const peekEl = queue[queue.length - 1]

    if (isLeft) {
      if (arr[i] != null) {
        console.log('[]:', peekEl, arr[i])
        peekEl.left = new TreeNode111(arr[i])
        queue.unshift(peekEl.left)
      }
      isLeft = false
    } else {
      if (arr[i] != null) {
        peekEl.right = new TreeNode111(arr[i])
        queue.unshift(peekEl.right)
      }

      queue.pop()
      isLeft = true
    }
  }

  return root
}

// Not optimizing the array to binary tree
function arr2tree2(arr: (number | null)[]) {
  return createTreeNode(arr, 1)
}
function createTreeNode(arr: (number | null)[], index: number): TreeNode111 | null {
  if (arr[index - 1] == null) {
    return null
  }

  if (index > arr.length) {
    return null
  }

  const node = new TreeNode111(arr[index - 1])

  node.left = createTreeNode(arr, 2 * index)
  node.right = createTreeNode(arr, 2 * index + 1)

  return node
}
function inOrderTraverse(root: TreeNode111 | null) {
  if (root == null) {
    return
  }

  console.log('[]:', root.val)
  inOrderTraverse(root.left)
  inOrderTraverse(root.right)
}
