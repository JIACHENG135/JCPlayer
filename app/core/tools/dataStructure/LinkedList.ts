import { ListNode } from './ListNode'

export class LinkedList {
  head: ListNode
  tail: ListNode
  map: Map<string, ListNode>
  limit: number
  size: number
  constructor() {
    this.limit = 24
    this.size = 0
    this.head = new ListNode(-1, {})
    this.tail = new ListNode(-1, {})
    this.head.next = this.tail
    this.tail.prev = this.head
    this.map = new Map<string, ListNode>()
  }

  public push(val: string, payload: any): void {
    const newNode: ListNode = new ListNode(val, payload)
    const last: ListNode = this.tail.prev
    last.next = newNode
    newNode.prev = last

    newNode.next = this.tail
    this.tail.prev = newNode

    this.map.set(val, newNode)
    this.size += 1
  }
  public add(val: string, payload: any): void {
    let newNode = this.map.get(val)
    if (newNode != undefined) {
      newNode.prev.next = newNode.next
      newNode.next.prev = newNode.prev
    } else {
      newNode = new ListNode(val, payload)
      this.size += 1
    }

    const first: ListNode = this.head.next
    first.prev = newNode
    newNode.next = first
    this.head.next = newNode
    newNode.prev = this.head
    this.map.set(val, newNode)
    if (this.size > this.limit) {
      this.pop()
    }
  }

  public getItem(val: string, payload: any): ListNode | undefined {
    this.add(val, payload)
    return this.map.get(val)
  }
  public pop(): any {
    const data = this.tail.prev.payload
    this.tail.prev.next = this.tail
    this.tail.prev = this.tail.prev.prev
    this.size -= 1
    return data
  }

  public serilize(val: Array<any>): void {
    let ct = 0
    while (ct < Math.min(val.length, this.limit)) {
      this.add(val[ct].name, val[ct])
      ct += 1
    }
  }

  public export(): Array<any> {
    const res = new Array<any>()
    let ct = 0
    const s = this.size
    while (ct < s) {
      res.push(this.pop())
      ct += 1
    }
    return res
  }
  public toString(): string {
    const res: string[] = []
    let newNode = this.head.next
    while (newNode != null) {
      res.push(newNode.toString())
      newNode = newNode.next
    }
    return res.join('->')
  }
}
