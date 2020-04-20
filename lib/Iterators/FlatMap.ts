import FlatIterableIterator from "./Flat";
import MapIterableIterator from "./Map";

export default class FlatMapIterableIterator<T> extends FlatIterableIterator<T> {
  constructor(source: IterableIterator<T>, fn: (v: T, k: number) => T | Iterable<T>) {
    super(new MapIterableIterator(source, fn));
  }
}