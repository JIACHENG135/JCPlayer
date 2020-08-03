export class ListNode {
  val: any
  prev: any
  next: any
  payload: any
  constructor(val: any, payload: any) {
    this.val = val
    this.prev = null
    this.next = null
    this.payload = payload
  }
  toString(): string {
    return this.val.toString()
  }
}
