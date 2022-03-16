function kidsWithCandies(candies: number[], extraCandies: number): boolean[] {
  const len = candies.length
  let max = -Infinity,
    ans: boolean[] = []

  for (let i = 0; i < len; ++i) {
    max = Math.max(max, candies[i])
  }

  for (let i = 0; i < len; ++i) {
    if (candies[i] + extraCandies >= max) {
      ans.push(true)
    } else {
      ans.push(false)
    }
  }

  return ans
}

function main() {
  const candies = [2, 3, 5, 1, 3]
  const extraCandies = 3

  console.log('[]:', kidsWithCandies(candies, extraCandies))
}

main()
