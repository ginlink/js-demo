/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

import { arr2tree, arr2tree2, TreeNode, TreeNode111 } from './common/utils'

/*
 * Encodes a tree to a single string.
 */
function serialize(root: TreeNode | null): string {
  const res: string[] = []
  rSerialize(root)
  return res.join(',')

  function rSerialize(root: TreeNode | null) {
    if (!root) {
      res.push('#')
      return
    }

    const val = root.val
    res.push(String(val))
    rSerialize(root.left)
    rSerialize(root.right)
  }
}

/*
 * Decodes your encoded data to tree.
 */
function deserialize(data: string): TreeNode | null {
  const list = data.split(',').reverse()
  return sDeserialize(list)

  function sDeserialize(list: string[]) {
    const val = list.pop()
    if (val == '#') {
      return null
    }

    const root = new TreeNode(+val)
    root.left = sDeserialize(list)
    root.right = sDeserialize(list)

    return root
  }
}

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */

function main() {
  // const root = arr2tree([1, 2, 3, null, null, 4, 5])
  const root = arr2tree2([1, 2, 3, null, null, 4, 5])

  console.log('[root]:', root)

  console.log('[]:', serialize(root))
  console.log('[]:', deserialize(serialize(root)))
}

main()

export {}
