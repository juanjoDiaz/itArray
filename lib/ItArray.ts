import IterableWithSource from "./IterableWithSource";
import MapIterable from "./Iterators/Map";
import FilterIterable from "./Iterators/Filter";
import FlatIterable from "./Iterators/Flat";
import reduce from "./reducers/Reducer";
import find from "./reducers/Find";
import { OptimizedFilterAndMapIterable, OptimizedFilterIterable, OptimizedMapIterable } from "./Iterators/Optimized";
import { safeToString, safeToLocaleString } from "./utils";


export default class ItArray<T> extends IterableWithSource<T, T> {
  constructor(source: Iterable<T>) {
    source instanceof ItArray ? super(source.source) : super(source);
  }

  // [n: number]: T;
  get length(): number {
    return this.reduce((acc: number) => acc + 1, 0);
  };
  set length(length: number) {
    throw new Error("Iterables can't be modified in-place. Instead of `.length = newLength`, use `.slice(0, newLenght)` to get a new iterable with the desired number of elements.");
  };
  pop(): T | undefined {
    throw new Error("Iterables can't be modified in-place. Instead of using `.pop()`, use `.length` to get the iterable lenght and either`.find((_, i) => i === lenght -1)` to get the last element of the array or `.slice(0, length - 1)` to get a new iterable without the last item.");
  }
  push(...items:  T[]): ItArray<T> {
    throw new Error("Iterables can't be modified in-place. Insted of using `.push(...items)`, use `.concat([...items])` to get a new iterable with the appended elements.");
  }
  splice(start: number, deleteCount: number, ...items:  T[]): ItArray<T> {
    throw new Error("Iterables can't be modified in-place. Instead of using .`splice(start, deleteCount, ...items)`, use `.slice(0, start).concat([...items]).concat(originalIterable.slice(start + deleteCount))` to get the desired iterable.");
  }
  shift(): T | undefined {
    throw new Error("Iterables can't be modified in-place. Instead of using .`shift()`, use `.find(() => true)` to get the first element and `.slice(1)` to skip the first element.");
  }
  unshift(...items:  T[]): number {
    throw new Error("Iterables can't be modified in-place. Instead of using `.shift(...items)`, use `new TransArray([...items]).concat(originalIterable)` to get a new iterable with the prepended elements.");
  }
  copyWithin(target: number, start: number, end?: number | undefined): this {
    throw new Error("Iterables can't be modified in-place. Use a combination of `slice` and `concat` to get a new iterable with the desired elements.");
  }
  concat(...items: (T | Iterable<T>)[]): ItArray<T> {
    return new ItArray(new FlatIterable([this.source, ...items]));
  }
  join(separator?: string): string {
    return reduce(this.source, (acc, v, i) => (i === 0) ? `${v}` : `${acc}${separator}${v}`, '');
  }
  reverse(): ItArray<T> {
    // TODO instead of reversing in memory, recreate the whole chain with the reverse on top.
    return new ItArray(this.toArray().reverse());
  }
  slice(start?: number, end?: number): ItArray<T> {
    // TODO check if .skip() would be faster
    // TODO add early termination .take(end - start)
    return this.filter((_, i) => (!start || i >= start) && (!end || i <= end));
  }
  sort(compareFn?: ((a: T, b: T) => number) | undefined): ItArray<T> {
    const sortedSrc = this.toArray();
    sortedSrc.sort(compareFn);
    return new ItArray(sortedSrc);
  }
  indexOf(searchElement: T, fromIndex?: number): number {
    return this.findIndex((v, k) => (fromIndex !== undefined && fromIndex > k) && v === searchElement);
  }
  lastIndexOf(searchElement: T, fromIndex?: number): number {
    return this.reduce((acc, v, k) => (fromIndex !== undefined && fromIndex > k) && v === searchElement ? k : acc , -1);
  }
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
    return this.findIndex((v, k) => !callbackfn(v, k)) === -1;
  }
  some(callbackfn: (value: T, index: number) => boolean): boolean {
    return this.findIndex(callbackfn) !== -1;
  }
  forEach(callbackfn: (value: T, index: number) => void): void {
    // TODO suboptimal perf
    this.reduce<void>((_, v, i) => { callbackfn(v, i); }, undefined);
  }
  map<U>(callbackfn: (value: T, index: number) => U): ItArray<U> {
    return new ItArray(new MapIterable(this.source, callbackfn));
  }
  optimizedmap<U>(callbackfn: (value: T, index: number) => U): ItArray<U> {
    if (this.source instanceof OptimizedMapIterable) return new ItArray(this.source.add(callbackfn));
    if (this.source instanceof MapIterable) return new ItArray(new OptimizedMapIterable(this.source.source, [this.source.fn, callbackfn]));
    if (this.source instanceof FilterIterable) return new ItArray(new OptimizedFilterAndMapIterable<T, T>(this.source.source).withFilter(this.source.fn).withMap(callbackfn));
    if (this.source instanceof OptimizedFilterAndMapIterable) return new ItArray(this.source.withMap(callbackfn));
    return new ItArray(new MapIterable(this.source, callbackfn));
  }
  optimized2map<U>(callbackfn: (value: T, index: number) => U): ItArray<U> {
    if (this.source instanceof MapIterable) return new ItArray(new OptimizedFilterAndMapIterable<T, T>(this.source.source).withMap(callbackfn));
    if (this.source instanceof FilterIterable) return new ItArray(new OptimizedFilterAndMapIterable<T, T>(this.source.source).withFilter(this.source.fn).withMap(callbackfn));
    if (this.source instanceof OptimizedFilterAndMapIterable) return new ItArray(this.source.withMap(callbackfn));
    return new ItArray(new MapIterable(this.source, callbackfn));
  }
  filter(callbackfn: (value: T, index: number) => boolean): ItArray<T> {
    return new ItArray(new FilterIterable(this.source, callbackfn));
  }
  optimizedfilter(callbackfn: (value: T, index: number) => boolean): ItArray<T> {
    if (this.source instanceof OptimizedFilterIterable) return new ItArray(this.source.add(callbackfn));
    if (this.source instanceof FilterIterable) return new ItArray(new OptimizedFilterIterable(this.source.source, [this.source.fn, callbackfn]));
    if (this.source instanceof MapIterable) return new ItArray(new OptimizedFilterAndMapIterable<T, T>(this.source.source).withMap(this.source.fn).withFilter(callbackfn));
    if (this.source instanceof OptimizedFilterAndMapIterable) return new ItArray(this.source.withFilter(callbackfn));
    return new ItArray(new FilterIterable(this.source, callbackfn));
  }
  optimized2filter(callbackfn: (value: T, index: number) => boolean): ItArray<T> {
    if (this.source instanceof FilterIterable) return new ItArray(new OptimizedFilterAndMapIterable<T, T>(this.source.source).withFilter(callbackfn));
    if (this.source instanceof MapIterable) return new ItArray(new OptimizedFilterAndMapIterable<T, T>(this.source.source).withMap(this.source.fn).withFilter(callbackfn));
    if (this.source instanceof OptimizedFilterAndMapIterable) return new ItArray(this.source.withFilter(callbackfn));
    return new ItArray(new FilterIterable(this.source, callbackfn));
  }
  reduce<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number) => U, initialValue: U): U {
    return reduce(this.source, callbackfn, initialValue);
  }
  reduceRight<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number) => U, initialValue: U): U {
    return this.reverse().reduce(callbackfn, initialValue);
  }
  fill(value: T, start?: number, end?: number): Iterable<T> {
    // TODO check if .skip() would be faster
    // TODO add early termination .take(end - start)
    return this.map((v, i) => (!start || i >= start) && (!end || i <= end) ? value : v);
  }
  entries(): ItArray<[number, T]> {
    return this.map((v, i) => ([i, v]));
  }
  keys(): ItArray<number> {
    return this.map((_, i) => i);
  }
  values(): ItArray<T> {
    return this;
  }
  flatMap<U>(callback: (value: T, index: number) => U | Iterable<U>): ItArray<U> {
    return this.map(callback).flat();
  }
  flat<U>(this: ItArray<U | Iterable<U>>, depth?: number): ItArray<U>{
    return new ItArray(new FlatIterable(this.source, depth));
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
  [Symbol.unscopables](): { [key: string]: boolean } {
    return {
      copyWithin: true,
      entries: true,
      fill: true,
      find: true,
      findIndex: true,
      flat: true,
      flatMap: true,
      includes: true,
      keys: true,
      values: true
    };
  }
  [Symbol.iterator](): Iterator<T> {
    return this.source[Symbol.iterator]();
  }
}