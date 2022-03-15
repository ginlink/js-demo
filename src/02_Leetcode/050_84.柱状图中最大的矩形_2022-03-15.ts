function largestRectangleArea(heights: number[]): number {
  const len = heights.length
  const stack: {
    pos: number
    value: number
  }[] = []
  let ans = 0

  for (let i = 0; i < len; ++i) {
    const curr = heights[i]
    const { pos: top, value: topValue } = stack[stack.length - 1] ?? {}

    if (topValue && curr < topValue) {
      const { pos } = stack.pop()

      let area = 0
      if (stack.length > 0) {
        area = (i - 1 - top) * heights[pos]
      } else {
        area = (i - top) * heights[pos]
      }

      ans = Math.max(ans, area)
    }

    stack.push({
      pos: i,
      value: heights[i],
    })
  }

  while (stack.length > 0) {
    const { pos } = stack.pop()
    const { pos: top } = stack[stack.length - 1] ?? { pos: 0 }

    let area = 0
    if (stack.length > 0) {
      area = (len - 1 - top) * heights[pos]
    } else {
      area = (len - top) * heights[pos]
    }

    ans = Math.max(ans, area)
  }

  return ans
}

function main() {
  // const heights = [2, 1, 5, 6, 2, 3]
  // const heights = [2, 1, 5, 6, 2] 5
  // const heights = [2, 4]
  // const heights = [1]
  const heights = [1, 1]
  // const heights = [9, 0]

  console.log('[]:', largestRectangleArea(heights))
}

main()

export {}
