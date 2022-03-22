function dailyTemperatures(temperatures: number[]): number[] {
  const len = temperatures.length
  const answer: number[] = []

  for (let i = 0; i < len; ++i) {
    for (let j = i + 1; j < len; ++j) {
      if (temperatures[j] > temperatures[i]) {
        answer[i] = j - i

        console.log('[i, j]:', i, j)
        break
      }
    }

    if (!answer[i]) {
      answer[i] = 0
    }
  }

  return answer
}

function main() {
  // const temperatures = [73, 74, 75, 71, 69, 72, 76, 73]
  const temperatures = [30, 40, 50, 60]

  console.log('[]:', dailyTemperatures(temperatures))
}

main()

export {}
