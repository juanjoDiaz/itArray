import SomeReducer from "./Some";

export default class EveryReducer<T> extends SomeReducer<T> {
  constructor(source: IterableIterator<T>, fn: (v: T, k: number) => boolean) {
    super(source, (value, index) => !fn(value, index));
  }

  next(): IteratorResult<boolean, boolean> {
    if (this.found) return { done: true, value: true };

    const { done } = super.next();
    if (done) return { done, value: !this.found };

    return { done: this.found, value: !this.found };
  }


  [Symbol.iterator](): IterableIterator<boolean | undefined> {
    return new EveryReducer(this.source, this.fn);
  }
}