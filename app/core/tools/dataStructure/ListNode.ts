export class ListNode {
  val: any
  prev: any
  next: any
  constructor(val: any) {
    this.val = val
    this.prev = null
    this.next = null
  }
  toString(): string {
    return this.val.toString()
  }
}
