// 递归反转链表方法
// http://c.biancheng.net/view/8105.html

function Node(value) {
  this.value = value
  this.next = null
}

function reverse(head) {
  if (head === null || head.next === null) return head
  else {
    let newHead = reverse(head.next)

    head.next.next = head
    head.next = null

    return newHead
  }
}

function createLink(head, num) {

  rec(head, num)
  return reverse(head)

  function rec(head, num) {
    if (num === 0) return
    else {
      let node = new Node(num)
      head.next = node
      createLink(node, --num)
    }
  }

}

let head = new Node(0)
head = createLink(head, 3)
console.log('[link]:', head)
console.log('[reversed-link]:', reverse(head))