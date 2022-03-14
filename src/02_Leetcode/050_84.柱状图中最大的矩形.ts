function largestRectangleArea(heights: number[]): number {
  const len = heights.length
  const stack: {
    pos: number
    value: number
  }[] = []
  let ans = 0

  if (len == 1) {
    return heights[0]
  }

  for (let i = 0; i < len; ++i) {
    const curr = heights[i]

    // console.log('[stack]:', stack)

    while (stack[stack.length - 1] && curr < stack[stack.length - 1].value) {
      // Out of stack
      const { pos } = stack.pop()
      const { pos: top } = stack[stack.length - 1] ?? { pos: 0 }

      const area = stack.length <= 0 ? (i - top) * heights[pos] : (i - 1 - top) * heights[pos]

      ans = Math.max(ans, area)
    }

    stack.push({ pos: i, value: curr })
  }

  while (stack.length > 0) {
    const { pos } = stack.pop()
    const { pos: top } = stack[stack.length - 1] ?? { pos: 0 }

    const area = stack.length <= 0 ? (len - top) * heights[pos] : (len - 1 - top) * heights[pos]

    ans = Math.max(ans, area)
  }

  return ans
}

function main() {
  // const heights = [2, 1, 5, 6, 2, 3]
  // const heights = [2, 1, 5, 6, 2] 5
  // const heights = [2, 4]
  // const heights = [1]
  // const heights = [1, 1]
  const heights = [9, 0]

  console.log('[]:', largestRectangleArea(heights))
}

main()
