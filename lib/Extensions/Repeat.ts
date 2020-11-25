export default class RepeatIterable<T> implements Iterable<T> {
  private value: T;
  private length: number;

  constructor(value: T, length: number) {
    this.value = value;
    this.length = length;
  }

  [Symbol.iterator](): Iterator<T> {
    return new RepeatIterator(this.value, this.length);
  }
}

class RepeatIterator<T> implements Iterator<T> {
  private value: T;
  private length?: number;
  private counter: number = 0;

  constructor(value: T, length?: number) {
    this.value = value;
    this.length = length;
  }

  next(): IteratorResult<T, undefined> {
    if (this.length) {
      if (this.counter >= this.length) {
        return { done: true, value: undefined };
      }

      this.counter += 1;
    }
    return { done: false, value: this.value };
  }
}