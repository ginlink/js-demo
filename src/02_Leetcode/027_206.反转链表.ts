import { createList, ListNode, traverseList } from './common/utils'

function main() {
  const head = createList()
  traverseList(head)
  // traverseList(head)
  // traverseList(head)

  console.log('[]:', '-------------')

  const newHead1 = reverseList1(head)
  traverseList(newHead1)

  const newHead2 = reverseList2(head)
}

main()

function reverseList1(head: ListNode): ListNode {
  // [1,2,3,4,5]
  let prev: ListNode | undefined
  let curr = head

  while (curr) {
    // cache
    const next = curr.next

    // move pointer
    curr.next = prev
    prev = curr
    curr = next
  }

  return prev
}

// function reverseList2(prev: ListNode, curr: ListNode): ListNode {
//   // [1,2,3,4,5]
//   if (!curr) {
//     return prev
//   }

//   curr.next = prev
//   prev = curr
//   curr = curr.next
//   return reverseList2(prev, curr)
// }

function reverseList2(head: ListNode): ListNode {
  // [1,2,3,4,5]
  if (!head || !head.next) {
    // the !head condition only for initial head value is undefined
    return head
  }

  const newHead = reverseList2(head.next)
  head.next.next = head
  head.next = undefined // only for the tail node
  return newHead
}
