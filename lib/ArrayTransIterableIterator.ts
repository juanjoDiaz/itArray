
import ValuesIterableIterator from "./Iterators/Values";

function isIterable<T>(obj: Iterator<T>): obj is IterableIterator<T> {
  return Symbol.iterator in obj;
}

export default class ArrayTransIterableIterator<T> extends ValuesIterableIterator<T> {
  protected rawSource: Iterable<T>;
  
  constructor(source: Iterable<T>) {
    const iterator = source[Symbol.iterator]();
    if (isIterable(iterator)) {
      super(iterator);
      this.rawSource = source;
    } else {
      throw new Error('Invalid iterable. It\'s iterator doesn\'t is not re-iterable.');
    }
  }

  [Symbol.iterator]() {
    return new ArrayTransIterableIterator(this.rawSource);
  }
}