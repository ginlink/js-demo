class TreeNode {
  val: number
  left: TreeNode | null
  right: TreeNode | null
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val
    this.left = left === undefined ? null : left
    this.right = right === undefined ? null : right
  }
}

function buildTree(preorder: number[], inorder: number[]): TreeNode | null {
  const preLen = preorder.length
  const inLen = inorder.length

  if (preLen != inLen) {
    throw new Error('Invalid preorder or inorder')
  }

  // Elements are not duplicated, so use elements as keys
  const inOrderMap = new Map<number, number>()
  for (let i = 0; i < inLen; ++i) {
    inOrderMap.set(inorder[i], i)
  }

  return buildTreeRec(preorder, 0, preLen - 1, inOrderMap, 0, inLen - 1)

  function buildTreeRec(
    preorder: number[],
    preLeft: number,
    preRight: number,
    inOrderMap: Map<number, number>,
    inLeft: number,
    inRight: number
  ): TreeNode {
    if (preLeft > preRight || inLeft > inRight) {
      return null
    }

    const rootVal = preorder[preLeft]
    const root = new TreeNode(rootVal)
    const pIndex = inOrderMap.get(rootVal)

    root.left = buildTreeRec(preorder, preLeft + 1, pIndex - inLeft + preLeft, inOrderMap, inLeft, pIndex - 1)
    root.right = buildTreeRec(preorder, pIndex - inLeft + preLeft + 1, preRight, inOrderMap, pIndex + 1, inRight)

    return root
  }
}

function main() {
  const preorder = [3, 9, 20, 15, 7]
  const inorder = [9, 3, 15, 20, 7]

  console.log('[]:', buildTree(preorder, inorder))
}

main()
