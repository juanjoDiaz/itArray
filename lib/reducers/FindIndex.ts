import BaseFindReducer from "./BaseFind";

export class FindIndexReducer<T> extends BaseFindReducer<T, number> {
  next(): IteratorResult<number, number> {
    if (this.found) return { done: true, value: this.index };

    const { done } = super.next();
    if (done) return { done, value: this.found ? this.index : -1 };

    return {
      done: this.found,
      value: this.found ? this.index : -1
    };
  }

  [Symbol.iterator](): IterableIterator<number | undefined> {
    return new FindIndexReducer(this.source, this.fn);
  }
}