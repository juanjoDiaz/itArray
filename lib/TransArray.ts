import IterableWithSource from "./IterableWithSource";
import MapIterable from "./Iterators/Map";
import FilterIterable from "./Iterators/Filter";
import FlatIterable from "./Iterators/Flat";
import reduce from "./reducers/Reducer";
import find from "./reducers/Find";
import { OptimizedFilterAndMapIterable, OptimizedFilterIterable, OptimizedMapIterable } from "./Iterators/Optimized";
import { safeToString, safeToLocaleString } from "./utils";


export default class TransArray<T> extends IterableWithSource<T, T> { // Array<T>, 
  constructor(source: Iterable<T>) {
    source instanceof TransArray ? super(source.source) : super(source);
  }

  [n: number]: T;
  // get length(): number {
  //   return new Reducer(this, (acc: number) => acc + 1, 1)[Symbol.iterator]().return().value;
  // };
  // set length(length: number) {
  //   throw new Error("Method not implemented.");
  // };
  pop(): T | undefined {
    throw new Error("Method not implemented.");
  }
  push(...items:  T[]): TransArray<T> {
    return this.concat(...items);
  }
  // splice(start: number, deleteCount: number, ...items:  T[]): TransArray<T> {
  //   return new TransArray(new SpliceIterable(this, start, deleteCount, ...items));
  // }
  unshift(...items:  T[]): number {
    throw new Error("Method not implemented.");
  }
  concat(...items: (T | Iterable<T>)[]): TransArray<T> {
    return new TransArray(new FlatIterable([this.source, ...items]));
  }
  join(separator?: string): string {
    return reduce(this.source, (acc, v, i) => (i === 0) ? `${v}` : `${acc}${separator}${v}`, '');
  }
  reverse(): TransArray<T> {
    // TODO instead of reversing in memory, recreate the whole chain with the reverse on top.
    return new TransArray(this.toArray().reverse());
  }
  shift(): T | undefined {
    throw new Error("Method not implemented.");
  }
  slice(start?: number, end?: number): TransArray<T> {
    // TODO add early termination
    return this.filter((_, i) => (!start || i >= start) && (!end || i <= end));
  }
  sort(compareFn?: ((a: T, b: T) => number) | undefined): TransArray<T> {
    const sortedSrc = this.toArray();
    sortedSrc.sort(compareFn);
    return new TransArray(sortedSrc);
  }
  indexOf(searchElement: T, fromIndex?: number): number {
    return this.findIndex((v) => v === searchElement);
  }
  // lastIndexOf(searchElement: T, fromIndex?: number): number {
  //   return new LastIndexOfReducer(this, searchElement).return().value;
  // }
  includes(searchElement: T, fromIndex?: number): boolean {
    return this.indexOf(searchElement, fromIndex) !== -1;
  }
  find(predicate: (value: T, index: number) => boolean): T | undefined {
    return (find(this.source, predicate) as any).value;
  }
  findIndex(predicate: (value: T, index: number) => boolean): number {
    return find(this.source, predicate).index;
  }
  every(callbackfn: (value: T, index: number) => boolean): boolean {
    return this.findIndex((v, i) => !callbackfn(v, i)) === -1;
  }
  some(callbackfn: (value: T, index: number) => boolean): boolean {
    return this.findIndex(callbackfn) !== -1;
  }
  forEach(callbackfn: (value: T, index: number) => void): void {
    // TODO suboptimal perf
    this.reduce<void>((_, v, i) => { callbackfn(v, i); }, undefined);
  }
  map<U>(callbackfn: (value: T, index: number) => U): TransArray<U> {
    return new TransArray(new MapIterable(this.source, callbackfn));
  }
  optimizedmap<U>(callbackfn: (value: T, index: number) => U): TransArray<U> {
    if (this.source instanceof OptimizedMapIterable) return new TransArray(this.source.add(callbackfn));
    if (this.source instanceof MapIterable) return new TransArray(new OptimizedMapIterable(this.source.source, [this.source.fn, callbackfn]));
    if (this.source instanceof FilterIterable) return new TransArray(new OptimizedFilterAndMapIterable<T, T>(this.source.source).withFilter(this.source.fn).withMap(callbackfn));
    if (this.source instanceof OptimizedFilterAndMapIterable) return new TransArray(this.source.withMap(callbackfn));
    return new TransArray(new MapIterable(this.source, callbackfn));
  }
  optimized2map<U>(callbackfn: (value: T, index: number) => U): TransArray<U> {
    if (this.source instanceof MapIterable) return new TransArray(new OptimizedFilterAndMapIterable<T, T>(this.source.source).withMap(callbackfn));
    if (this.source instanceof FilterIterable) return new TransArray(new OptimizedFilterAndMapIterable<T, T>(this.source.source).withFilter(this.source.fn).withMap(callbackfn));
    if (this.source instanceof OptimizedFilterAndMapIterable) return new TransArray(this.source.withMap(callbackfn));
    return new TransArray(new MapIterable(this.source, callbackfn));
  }
  filter(callbackfn: (value: T, index: number) => boolean): TransArray<T> {
    return new TransArray(new FilterIterable(this.source, callbackfn));
  }
  optimizedfilter(callbackfn: (value: T, index: number) => boolean): TransArray<T> {
    if (this.source instanceof OptimizedFilterIterable) return new TransArray(this.source.add(callbackfn));
    if (this.source instanceof FilterIterable) return new TransArray(new OptimizedFilterIterable(this.source.source, [this.source.fn, callbackfn]));
    if (this.source instanceof MapIterable) return new TransArray(new OptimizedFilterAndMapIterable<T, T>(this.source.source).withMap(this.source.fn).withFilter(callbackfn));
    if (this.source instanceof OptimizedFilterAndMapIterable) return new TransArray(this.source.withFilter(callbackfn));
    return new TransArray(new FilterIterable(this.source, callbackfn));
  }
  optimized2filter(callbackfn: (value: T, index: number) => boolean): TransArray<T> {
    if (this.source instanceof FilterIterable) return new TransArray(new OptimizedFilterAndMapIterable<T, T>(this.source.source).withFilter(callbackfn));
    if (this.source instanceof MapIterable) return new TransArray(new OptimizedFilterAndMapIterable<T, T>(this.source.source).withMap(this.source.fn).withFilter(callbackfn));
    if (this.source instanceof OptimizedFilterAndMapIterable) return new TransArray(this.source.withFilter(callbackfn));
    return new TransArray(new FilterIterable(this.source, callbackfn));
  }
  reduce<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number) => U, initialValue: U): U {
    return reduce(this.source, callbackfn, initialValue);
  }
  reduceRight<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number) => U, initialValue: U): U {
    return this.reverse().reduce(callbackfn, initialValue);
  }
  fill(value: T, start?: number, end?: number): Iterable<T> {
    // TODO end early termination
    return this.map((v, i) => (!start || i >= start) && (!end || i <= end) ? value : v);
  }
  copyWithin(target: number, start: number, end?: number | undefined): this {
    throw new Error("Method not implemented.");
  }
  entries(): TransArray<[number, T]> {
    return this.map((v, i) => ([i, v]));
  }
  keys(): TransArray<number> {
    return this.map((_, i) => i);
  }
  values(): TransArray<T> {
    return this;
  }
  flatMap<U>(callback: (value: T, index: number) => U | Iterable<U>): TransArray<U> {
    return this.map(callback).flat();
  }
  flat<U>(this: TransArray<U | Iterable<U>>, depth?: number): TransArray<U>{
    return new TransArray(new FlatIterable(this.source, depth));
  }
  toString(): string {
    return this.reduce((acc, v, k) => k === 0 ? safeToString(v) : `${acc},${safeToString(v)}`, '');
  }
  toLocaleString(): string {
    return this.reduce((acc, v, k) => k === 0 ? safeToLocaleString(v) : `${acc},${safeToLocaleString(v)}`, '');
  }
  toArray(): Array<T> {
    return this.reduce((acc, v) => {
      acc.push(v);
      return acc;
    }, [] as T[]);
  }
  [Symbol.unscopables](): { copyWithin: boolean; entries: boolean; fill: boolean; find: boolean; findIndex: boolean; keys: boolean; values: boolean; } {
    throw new Error("Method not implemented.");
  }
  [Symbol.iterator](): Iterator<T> {
    return this.source[Symbol.iterator]();
  }
}