import ConcatIterableIterator from "./Iterators/Concat";
import FillIterableIterator from "./Iterators/Fill";
import FilterIterableIterator from "./Iterators/Filter";
import FlatIterableIterator from "./Iterators/Flat";
import KeysIterableIterator from "./Iterators/Keys";
import MapIterableIterator from "./Iterators/Map";
import SliceIterableIterator from "./Iterators/Slice";
import ValuesIterableIterator from "./Iterators/Values";
import FlatMapIterableIterator from "./Iterators/FlatMap";

export default abstract class TransformIterableIterator<TIn, TOut = TIn, TReturn = any> implements IterableIterator<TOut> {
  protected source: IterableIterator<TIn>;

  constructor(source: IterableIterator<TIn>) {
    this.source = source[Symbol.iterator]();
  }

  abstract next(): IteratorResult<TOut, TReturn>;

  return(): IteratorResult<TOut, TReturn> {
    while (true) {
      const res = this.next();
      if (res.done) return res
    }
  }

  throw(err: any): IteratorResult<TOut, TReturn> {
    throw err;
  }

  abstract [Symbol.iterator](): IterableIterator<TOut>;

  concat(...otherIterables: Array<Iterable<TOut>>) {
    return new ConcatIterableIterator(this, ...otherIterables);
  }
  // copyWithin()
  // entries()
  // every()
  fill(value: TOut, start?: number, end?: number) {
    return new FillIterableIterator(this, value, start, end);
  }
  filter(fn: (v: TOut, k: number) => boolean) {
    return new FilterIterableIterator(this, fn);
  }
  // find()
  // findIndex()
  flat() {
    return new FlatIterableIterator(this);
  }
  flatMap(fn: (v: TOut, k: number) => TOut | Iterable<TOut>) {
    return new FlatMapIterableIterator(this, fn);
  }
  // forEach()
  // includes()
  // indexOf()
  // join()
  keys() {
    return new KeysIterableIterator(this);
  }
  // lastIndexOf()
  map<T>(fn: (v: TOut, k: number) => T) {
    return new MapIterableIterator(this, fn);
  }
  // pop()
  // push()
  // reduce()
  // reduceRight()
  // reverse()
  // shift()
  slice(begin?: number, end?: number) {
    return new SliceIterableIterator(this, begin, end);
  }
  // some()
  // sort()
  // splice()
  // toLocaleString()
  // toSource()
  // toString()
  // unshift()
  values() {
    return new ValuesIterableIterator(this);
  }
}