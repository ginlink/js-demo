export class ListNode {
  val?: any
  next: ListNode

  constructor(val?: any) {
    this.val = val
  }
}

export class TreeNode {
  val: number
  left: TreeNode | null = null
  right: TreeNode | null = null

  constructor(val: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val
    this.left = left
    this.right = right
  }
}

export class TreeNode111 {
  val: number
  left: TreeNode | null = null
  right: TreeNode | null = null

  constructor(val: number) {
    this.val = val
  }
}

// Exchange algorithm
export function swap(arr, a, b) {
  const tmp = arr[b]
  arr[b] = arr[a]
  arr[a] = tmp
}

// Adaptation to deep copy
export function deep_clone(o) {
  return rec(o)
  function rec(o) {
    if (typeof o !== 'object' || o === null || o === undefined || typeof o === 'function') return o

    if (o instanceof Array) {
      const tmp = []
      o.forEach((item) => {
        tmp.push(rec(item))
      })

      return tmp
    } else if (o instanceof Object) {
      // 遍历类，这里要注意reg类型
      if (o instanceof RegExp) return o
      else {
        const obj = {}
        const keys = Object.keys(o)
        for (let i = 0; i < keys.length; i++) {
          obj[keys[i]] = rec(o[keys[i]])
        }
        return obj
      }
    }
  }
}

// Create an array
export function createArr(num = 100) {
  const tmp = []
  for (let i = 0; i < num; i++) {
    const item = Math.floor(Math.random() * 100)
    tmp.push(item)
  }

  return tmp
}

// Optimize array to binary tree
export function arr2tree(arr: (number | null)[]) {
  if (arr[0] == null) return null

  const queue: (TreeNode | null)[] = []
  const root = new TreeNode111(arr[0])

  queue.unshift(root)

  let isLeft = true
  for (let i = 1; i < arr.length; ++i) {
    const peekEl = queue[queue.length - 1]

    if (isLeft) {
      if (arr[i] != null) {
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
export function arr2tree2(arr: (number | null)[]) {
  return createTreeNode(arr, 1)

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
}

export function createList(n = 5): ListNode {
  if (n <= 0) return

  const head = new ListNode(1)
  let cloneHead = head

  for (let i = 1; i < n; ++i) {
    const newNode = new ListNode(i + 1)
    cloneHead.next = newNode

    cloneHead = cloneHead.next
  }

  return head
}

export function traverseList(head: ListNode) {
  let clone = head
  while (clone) {
    console.log('[val]:', clone.val)
    clone = clone.next
  }
}
