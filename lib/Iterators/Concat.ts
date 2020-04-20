import ValuesIterableIterator from "./Values";
import FlatIterableIterator from "./Flat";
import ArrayTransIterableIterator from "../ArrayTransIterableIterator";

export default class ConcatIterableIterator<T> extends ValuesIterableIterator<T> {
  protected rawSource: Array<Iterable<T>>;

  constructor(source: IterableIterator<T>, ...otherIterators: Array<Iterable<T>>) {
    const rawSource = [source, ...otherIterators.map(it => new ArrayTransIterableIterator(it))];
    super(new FlatIterableIterator(new ArrayTransIterableIterator(rawSource)));
    this.rawSource = rawSource;
  }

  [Symbol.iterator](): IterableIterator<T> {
    const [source, ...otherIterators] = this.rawSource.map(v => new ArrayTransIterableIterator(v));
    return new ConcatIterableIterator(source, ...otherIterators);
  }
}