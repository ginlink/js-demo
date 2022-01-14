import { sum } from './index'
import { bubble } from './sort'

it('two plus two is four', () => {
  expect(sum(2, 2)).toBe(4)
})

// const arr = [
//   3, 2, 5, 4, 1, 3, 2, 5, 4, 1, 4, 1, 3, 2, 5, 4, 1, 4, 1, 3, 2, 5, 4, 1, 4, 1, 3, 2, 5, 4, 1, 4, 1, 3, 2, 5, 4, 1, 4,
//   1, 3, 2, 5, 4, 1, 4, 1, 3, 2, 5, 4, 1, 4, 1, 3, 2, 5, 4, 1, 4, 1, 3, 2, 5, 4, 1, 4, 1, 3, 2, 5, 4, 1,
// ]

// console.log('[]:', bubble(arr))
