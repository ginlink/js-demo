function dailyTemperatures(temperatures: number[]): number[] {
  const len = temperatures.length
  const answer: number[] = []

  for (let i = 0; i < len; ++i) {
    for (let j = i + 1; j < len; ++j) {
      if (temperatures[j] > temperatures[i]) {
        answer[i] = j - i

        break
      }
    }

    if (!answer[i]) {
      answer[i] = 0
    }
  }

  return answer
}

function dailyTemperatures111(temperatures: number[]): number[] {
  const len = temperatures.length

  if (len <= 0) {
    return []
  }

  // store pos
  const stack: number[] = []
  const answer: number[] = new Array(len).fill(0)

  stack.push(0)
  for (let i = 1; i < len; ++i) {
    while (temperatures[i] > temperatures[stack[stack.length - 1]]) {
      const pos = stack.pop()

      answer[pos] = i - pos
    }

    stack.push(i)
  }

  // while (stack.length > 0) {
  //   const pos = stack.pop()

  //   answer[pos] = 0
  // }

  return answer
}

function main() {
  const temperatures = [73, 74, 75, 71, 69, 72, 76, 73]
  // const temperatures = [30, 40, 50, 60]

  console.log('[]:', dailyTemperatures(temperatures))
  console.log('[]:', dailyTemperatures111(temperatures))
}

main()

export {}
