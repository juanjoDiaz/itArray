import BaseFindReducer from "./BaseFind";

export default class SomeReducer<TIn> extends BaseFindReducer<TIn, boolean> {
  next(): IteratorResult<boolean, boolean> {
    if (this.found) return { done: true, value: true };

    const { done } = super.next();
    if (done) return { done, value: this.found };

    return { done: this.found, value: this.found };
  }

  [Symbol.iterator](): IterableIterator<boolean | undefined> {
    return new SomeReducer(this.source, this.fn);
  }
}