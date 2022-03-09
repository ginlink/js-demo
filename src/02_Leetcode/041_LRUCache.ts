class DLinkedNode {
  key: number
  value: number
  prev: DLinkedNode | undefined
  next: DLinkedNode | undefined

  constructor(key?: number, value?: number) {
    this.key = key
    this.value = value
  }
}

class LRUCache {
  private capacity: number
  private size: number
  private cache = new Map<number, DLinkedNode>()
  private head: DLinkedNode
  private tail: DLinkedNode

  constructor(capacity: number) {
    this.capacity = capacity
    this.size = 0
    this.head = new DLinkedNode()
    this.tail = new DLinkedNode()

    this.head.next = this.tail
    this.tail.prev = this.head
  }

  get(key: number): number {
    const node = this.cache.get(key)

    if (node === undefined) {
      return -1
    } else {
      this.moveToHead(node)
      return node.value
    }
  }

  put(key: number, value: number): void {
    const node = this.cache.get(key)

    if (node === undefined) {
      // create node
      const newNode = new DLinkedNode(key, value)
      this.cache.set(key, newNode)
      this.addToHead(newNode)
      ++this.size

      if (this.size > this.capacity) {
        const last = this.removeTail()
        this.cache.delete(last.key)
        --this.size
      }
    } else {
      node.value = value
      this.moveToHead(node)
    }
  }

  addToHead(node: DLinkedNode) {
    // Insert elements in head, first prev, then next
    // Insert elements in tail, first next, then prev
    node.prev = this.head
    node.next = this.head.next
    this.head.next.prev = node
    this.head.next = node
  }

  removeNode(node: DLinkedNode) {
    node.prev.next = node.next
    node.next.prev = node.prev
  }

  moveToHead(node: DLinkedNode) {
    this.removeNode(node)
    this.addToHead(node)
  }

  removeTail() {
    const last = this.tail.prev
    this.removeNode(last)

    // for finding the key, and remove the element in cache
    return last
  }
}

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */

function main() {
  const obj = new LRUCache(2)
  const param_1 = obj.get(0)
  obj.put(0, 1)
  const param_2 = obj.get(0)

  console.log('[param_1]:', param_1)
  console.log('[param_2]:', param_2)
}

main()
