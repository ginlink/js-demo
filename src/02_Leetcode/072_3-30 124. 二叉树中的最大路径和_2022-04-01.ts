import { arr2tree, TreeNode } from './common/utils'

function maxPathSum(root: TreeNode | null): number {
  // there is not be 0, because
  // father node can be a negative number
  let ans: number = Number.MIN_SAFE_INTEGER
  maxGain(root)
  return ans

  function maxGain(root: TreeNode | null): number {
    if (root == null) {
      return 0
    }

    const leftVal = Math.max(0, maxGain(root.left))
    const rightVal = Math.max(0, maxGain(root.right))

    const val = root.val
    ans = Math.max(ans, val + leftVal + rightVal)

    return val + Math.max(leftVal, rightVal)
  }
}

function main() {
  // const root = arr2tree([1, 2, 3])
  const root = arr2tree([-10, 9, 20, null, null, 15, 7])

  console.log('[]:', maxPathSum(root))
  // console.log('[]:', maxPathSum111(root))
}

main()

export {}
