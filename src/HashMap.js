// import LinkedList from "./LinkedList.js";
import Node from "./Node.js";

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
    let current;

    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    if (this.buckets[index] === null) {
      // Set new key value pair if bucket is empty
      this.buckets[index] = new Node(key, value);
    } else {
      current = this.buckets[index];

      // Update key if it already exists
      if (current.key === key) {
        current.value = value;
        return;
      }
      
      // Go to end of list
      while (current.nextNode !== null) {
        current = current.nextNode;
      }

      // Append new node
      current.nextNode = new Node(key, value);
    }
  }

  get(key) {
    const index = this.hash(key);
    let current = this.buckets[index];

    if (current.key === key) {
      return current;
    } else {
      // Loop through list until key is found
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
}
