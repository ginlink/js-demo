import { TreeNode111, TreeNode } from './common/utils'

function recoverFromPreorder(traversal: string): TreeNode | null {
  const len = traversal.length
  let pos = 0
  const stack: TreeNode[] = []
  while (pos < len) {
    let level = 0
    while (pos < len && traversal.charAt(pos) == '-') {
      pos++
      level++
    }

    let val = 0
    while (pos < len && traversal.charAt(pos) != '-') {
      val = 10 * val + Number(traversal.charAt(pos))

      pos++
    }

    console.log('[val, pos and stack]:', val, pos)
    const newNode = new TreeNode(val)
    if (level == stack.length) {
      if (stack[stack.length - 1]) {
        stack[stack.length - 1].left = newNode
      }
    } else if (level < stack.length) {
      while (level != stack.length) {
        stack.pop()
      }

      stack[stack.length - 1].right = newNode
    }

    stack.push(newNode)
  }

  return stack[0] ?? null
}

function main() {
  const traversal = '1-2--3--4-5--6--7'

  console.log('[]:', recoverFromPreorder(traversal))
}

main()

export {}
