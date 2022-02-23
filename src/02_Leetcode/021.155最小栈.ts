class MinStack {
  private readonly stack = []
  private readonly minStack = []
  // assist stack
  // only for get min element

  private len = 0

  push(e: number) {
    this.stack.push(e)

    if (this.len == 0) {
      this.minStack.push(e)
    } else {
      const oldMin = this.minStack[this.len - 1] ?? Infinity
      this.minStack.push(Math.min(e, oldMin))
    }

    ++this.len
  }
  pop() {
    if (this.len == 0) return undefined

    const e = this.stack.pop()
    this.minStack.pop()

    --this.len

    return e
  }
  top() {
    return this.stack[this.len - 1]
  }
  getMin() {
    return this.minStack[this.len - 1]
  }
}

function main() {
  const stack = new MinStack()

  stack.push(-2)
  stack.push(0)
  stack.push(-3)

  console.log('[getMin]:', stack.getMin())
  console.log('[pop]:', stack.pop())
  console.log('[top]:', stack.top())
  console.log('[getMin]:', stack.getMin())
}

main()
