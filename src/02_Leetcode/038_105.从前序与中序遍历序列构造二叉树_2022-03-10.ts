export class TreeNode {
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
  const pLen = preorder.length
  const iLen = inorder.length
  const inorderMap = new Map<number, number>()
  for (let i = 0; i < iLen; ++i) {
    inorderMap.set(inorder[i], i)
  }

  return buildTreeRec(preorder, 0, pLen - 1, inorderMap, 0, iLen - 1)

  function buildTreeRec(
    preorder: number[],
    preLeft: number,
    preRight: number,
    inorderMap: Map<number, number>,
    inLeft: number,
    inRight: number
  ) {
    if (preLeft > preRight || inLeft > inRight) {
      return null
    }

    const val = preorder[preLeft]
    const root = new TreeNode(val)
    const pIndex = inorderMap.get(val)

    root.left = buildTreeRec(preorder, preLeft + 1, pIndex - inLeft + preLeft, inorderMap, inLeft, pIndex - 1)
    root.right = buildTreeRec(preorder, pIndex - inLeft + preLeft + 1, preRight, inorderMap, pIndex + 1, inRight)

    return root
  }
}

function main() {
  const preorder = [3, 9, 20, 15, 7]
  const inorder = [9, 3, 15, 20, 7]

  console.log('[]:', buildTree(preorder, inorder))
}

main()
