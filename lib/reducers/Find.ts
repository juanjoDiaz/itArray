import BaseFindReducer from "./BaseFind";

export default class FindReducer<T> extends BaseFindReducer<T, T>{
  [Symbol.iterator](): IterableIterator<T | undefined> {
    return new FindReducer(this.source, this.fn);
  }
}