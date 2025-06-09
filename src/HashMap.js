// import LinkedList from "./LinkedList.js";
import Node from "./Node.js";

export default class HashMap {
  constructor(loadFactor = 0.8, capacity = 16) {
    this.loadFactor = loadFactor;
    this.capacity = capacity;
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

  set(key, value) {
    const index = this.hash(key);
    let current = this.buckets[index];

    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    if (this.buckets[index] === null) {
      // Set new key value pair if bucket is empty
      this.buckets[index] = new Node(key, value);
    } else {
      // Go to end of list
      while (current.nextNode !== null) {
        // INCORRECT
        // Update key if it already exists
        if (current.key === key) {
          console.log(current.key);
          current.value = value;
          return;
        }
        current = current.nextNode;
      }

      if (current.key === key) {
        console.log(current.key);
        current.value = value;
        return;
      }

      // Append new node
      current.nextNode = new Node(key, value);
    }
  }

  get(key) {
    const index = this.hash(key);
    let current = this.buckets[index];

    if (current === null) return null;

    if (current.key === key) {
      return current;
    } else {
      while (current.nextNode !== null) {
        current = current.nextNode;
        if (current.key === key) return current;
      }

      return null;
    }
  }

  has(key) {
    const index = this.hash(key);
    let current = this.buckets[index];

    if (current === null) return false;

    if (current.key === key) {
      return true;
    } else {
      while (current.nextNode !== null) {
        current = current.nextNode;
        if (current.key === key) {
          return true;
        }
      }
    }
    return false;
  }

  remove(key) {
    const index = this.hash(key);
    let current = this.buckets[index];
    let prev = null;

    if (current === null) return false;

    while (current) {
      if (current.key === key) {
        if (prev === null) {
          // Remove head
          this.buckets[index] = current.nextNode;
        } else {
          prev.nextNode = current.nextNode;
        }
        return true;
      }
      prev = current;
      current = current.nextNode;
    }
    return false;
  }

  length() {
    let count = 0;

    for (const bucket of this.buckets) {
      let current = bucket;
      while (current) {
        count++;
        current = current.nextNode;
      }
    }
    return count;
  }

  clear() {
    this.buckets.fill(null);
  }

  keys() {
    const keys = [];

    for (const bucket of this.buckets) {
      let current = bucket;
      while (current) {
        keys.push(current.key);
        current = current.nextNode;
      }
    }
    return keys;
  }

  values() {
    const values = [];

    for (const bucket of this.buckets) {
      let current = bucket;
      while (current) {
        values.push(current.value);
        current = current.nextNode;
      }
    }
    return values;
  }

  entries() {
    const entries = [];

    for (const bucket of this.buckets) {
      let current = bucket;
      while (current) {
        const keyValue = [current.key, current.value];
        current = current.nextNode;
        entries.push(keyValue);
      }
    }
    return entries;
  }
}
