import { TreeNode111, TreeNode } from './common/utils'

function recoverFromPreorder(traversal: string): TreeNode | null {
  const len = traversal.length,
    stack: TreeNode[] = []
  for (let pos = 0; pos < len; ) {
    // level
    let level = 0
    while (pos < len && traversal.charAt(pos) == '-') {
      ++level
      ++pos
    }

    // val
    let val = 0
    while (pos < len && traversal.charAt(pos) != '-') {
      val = val * 10 + Number(traversal.charAt(pos))
      ++pos
    }

    const newNode = new TreeNode(val)
    // compare level and stack's length
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
