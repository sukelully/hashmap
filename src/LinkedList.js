export default class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  append(val) {
    if (val === null || val === undefined) throw new Error("Invalid val");

    const node = new Node(val);

    if (!this.head) {
      this.tail = node;
      this.head = node;
    } else {
      this.tail.nextNode = node;
      this.tail = node;
    }
  }

  toString() {
    let current = this.head;
    let outputString = `( ${this.head.val} ) -> `;

    while (current.nextNode) {
      current = current.nextNode;
      outputString += `( ${current.val} ) -> `;
    }
    outputString += "null";
    return outputString;
  }
}
