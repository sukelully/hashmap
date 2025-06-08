import LinkedList from "./LinkedList.js";

export default class HashMap {
  constructor(loadFactor = 0.8, capacity = 16) {
    this.loadFactor = loadFactor;
    this.capacity = capacity;
    this.buckets = new Array(this.capacity).fill(null);
  }

  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    const MAX_INT = 2 ** 32;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % MAX_INT;
    }

    return hashCode % this.capacity;
  }

  set(key, value) {
    const index = this.hash(key);

    if (this.buckets[index] === null) {
      this.buckets[index] = value;
    } else {
      let temp = this.buckets[index];
      this.buckets[index] = new LinkedList;
      this.buckets[index].append(temp);
      this.buckets[index].append(value);
    }
  }

  get(key) {
    const index = this.hash(key);
    console.log(this.buckets);
    return this.buckets[index];
  }
}
