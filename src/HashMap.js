import Node from "./Node.js";

export default class HashMap {
  constructor(loadFactor = 0.8, capacity = 16) {
    this.loadFactor = loadFactor;
    this.capacity = capacity;
    this.size = 0; // New: tracks actual key-value count
    this.buckets = new Array(this.capacity).fill(null);
  }

  hash(key) {
    if (key === "" || key === null) throw new Error("Invalid key");

    let hashCode = 0;
    const primeNumber = 31;
    const maxInt = 2 ** 32;

    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % maxInt;
    }

    return hashCode % this.capacity;
  }

  resize() {
    const oldBuckets = this.buckets;
    this.capacity *= 2;
    this.buckets = new Array(this.capacity).fill(null);
    this.size = 0; // Reset and recount via set()

    for (const [key, value] of this.entries(oldBuckets)) {
      this.set(key, value);
    }
  }

  set(key, value) {
    const index = this.hash(key);
    let current = this.buckets[index];

    if (current === null) {
      this.buckets[index] = new Node(key, value);
      this.size++;
    } else {
      while (true) {
        if (current.key === key) {
          current.value = value;
          return;
        }
        if (current.nextNode === null) break;
        current = current.nextNode;
      }
      current.nextNode = new Node(key, value);
      this.size++;
    }

    if (this.size / this.capacity > this.loadFactor) {
      this.resize();
    }
  }

  get(key) {
    const index = this.hash(key);
    let current = this.buckets[index];

    while (current) {
      if (current.key === key) return current.value;
      current = current.nextNode;
    }

    return null;
  }

  has(key) {
    const index = this.hash(key);
    let current = this.buckets[index];

    while (current) {
      if (current.key === key) return true;
      current = current.nextNode;
    }

    return false;
  }

  remove(key) {
    const index = this.hash(key);
    let current = this.buckets[index];
    let prev = null;

    while (current) {
      if (current.key === key) {
        if (prev === null) {
          this.buckets[index] = current.nextNode;
        } else {
          prev.nextNode = current.nextNode;
        }
        this.size--;
        return true;
      }
      prev = current;
      current = current.nextNode;
    }

    return false;
  }

  length() {
    return this.size;
  }

  clear() {
    this.buckets.fill(null);
    this.size = 0;
  }

  keys(buckets = this.buckets) {
    const keys = [];
    for (const bucket of buckets) {
      let current = bucket;
      while (current) {
        keys.push(current.key);
        current = current.nextNode;
      }
    }
    return keys;
  }

  values(buckets = this.buckets) {
    const values = [];
    for (const bucket of buckets) {
      let current = bucket;
      while (current) {
        values.push(current.value);
        current = current.nextNode;
      }
    }
    return values;
  }

  entries(buckets = this.buckets) {
    const entries = [];
    for (const bucket of buckets) {
      let current = bucket;
      while (current) {
        entries.push([current.key, current.value]);
        current = current.nextNode;
      }
    }
    return entries;
  }
}
