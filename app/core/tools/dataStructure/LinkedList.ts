import { ListNode } from './ListNode'

export class LinkedList {
  head: ListNode
  tail: ListNode
  map: Map<string, ListNode>
  constructor() {
    this.head = new ListNode(-1)
    this.tail = new ListNode(-1)
    this.head.next = this.tail
    this.tail.prev = this.head
    this.map = new Map<string, ListNode>()
  }

  push(val: string): void {
    const newNode: ListNode = new ListNode(val)
    const last: ListNode = this.tail.prev
    last.next = newNode
    newNode.prev = last

    newNode.next = this.tail
    this.tail.prev = newNode

    this.map[val] = newNode
  }
  add(val: string): void {
    const newNode: ListNode = new ListNode(val)
    const first: ListNode = this.head.next
    first.prev = newNode
    newNode.next = first
    this.head.next = newNode
    newNode.prev = this.head
    this.map[val] = newNode
  }
  delete(val: string): void {
    const curNode: ListNode = this.map[val]
    const prev = curNode.prev
    const next = curNode.next
    prev.next = next
    next.prev = prev
    this.map.delete(val)
  }
  get(val: string): ListNode | undefined {
    if (!this.map.has(val)) {
      return undefined
    } else {
      this.delete(val)
      this.add(val)
      return this.map.get(val)
    }
  }
  pop(): void {
    this.tail.prev.next = this.tail
    this.tail.prev = this.tail.prev.prev
  }

  toString(): string {
    const res: string[] = []
    let newNode = this.head.next
    while (newNode != null) {
      res.push(newNode.toString())
      newNode = newNode.next
    }
    return res.join('->')
  }
}
