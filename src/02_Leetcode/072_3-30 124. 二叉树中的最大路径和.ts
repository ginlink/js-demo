import { arr2tree, TreeNode } from './common/utils'

function maxPathSum(root: TreeNode | null): number {
  let ans = Number.MIN_SAFE_INTEGER
  maxGain(root)

  return ans

  function maxGain(root: TreeNode | null): number {
    if (root == null) {
      return 0
    }

    const leftGain = Math.max(maxGain(root.left), 0)
    const rightGain = Math.max(maxGain(root.right), 0)

    const currGain = root.val
    ans = Math.max(ans, currGain + leftGain + rightGain)

    return currGain + Math.max(leftGain, rightGain)
  }
}

// It doesn't really help to speed things up, right
function maxPathSum111(root: TreeNode | null): number {
  let ans = Number.MIN_SAFE_INTEGER
  const maxGain = (root: TreeNode | null): number => {
    if (root == null) {
      return 0
    }

    const leftGain = Math.max(maxGain(root.left), 0)
    const rightGain = Math.max(maxGain(root.right), 0)

    const currGain = root.val
    ans = Math.max(ans, currGain + leftGain + rightGain)

    return currGain + Math.max(leftGain, rightGain)
  }

  return (() => {
    maxGain(root)

    return ans
  })()
}

function main() {
  // const root = arr2tree([1, 2, 3])
  const root = arr2tree([-10, 9, 20, null, null, 15, 7])

  console.log('[]:', maxPathSum(root))
  console.log('[]:', maxPathSum111(root))
}

main()

export {}
