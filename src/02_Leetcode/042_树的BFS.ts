import { arr2tree2, TreeNode111 } from './common/utils'

export function treeBFS(root: TreeNode111) {
  let res: number[][] = []

  const queue: TreeNode111[] = []
  if (root != null) {
    queue.push(root)
  }

  while (queue.length > 0) {
    const layerRes = []
    const len = queue.length
    for (let i = 0; i < len; ++i) {
      const curr = queue.shift()

      layerRes.push(curr.val)

      if (curr.left != null) {
        queue.push(curr.left)
      }
      if (curr.right != null) {
        queue.push(curr.right)
      }
    }

    res.push(layerRes)
  }

  return res
}

function main() {
  // const root = arr2tree2([3, 9, 20, null, null, 15, 7])
  const root = arr2tree2([])
  console.log('[root]:', root)

  console.log('[]:', treeBFS(root))
}

main()
