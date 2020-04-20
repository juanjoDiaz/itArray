// import ConcatIterableIterator from "./Iterators/Concat";
// import ToStringReducer from "./reducers/ToString";
// import ToLocaleStringReducer from "./reducers/ToLocaleString";
// import JoinReducer from "./reducers/Join";
// import SliceIterableIterator from "./Iterators/Slice";
// import { IndexOfReducer } from "./reducers/IndexOf";
// import { LastIndexOfReducer } from "./reducers/LastIndexOf";
// import EveryReducer from "./reducers/Every";
// import SomeReducer from "./reducers/Some";
// import MapIterableIterator from "./Iterators/Map";
// import FilterIterableIterator from "./Iterators/Filter";
// import Reducer from "./reducers/Reducer";
// import FindReducer from "./reducers/Find";
// import { FindIndexReducer } from "./reducers/FindIndex";
// import FillIterableIterator from "./Iterators/Fill";
// import KeysIterableIterator from "./Iterators/Keys";
// import ValuesIterableIterator from "./Iterators/Values";
// import IncludesReducer from "./reducers/Includes";
// import FlatMapIterableIterator from "./Iterators/FlatMap";
// import FlatIterableIterator from "./Iterators/Flat";

// export default class TransArray<T> implements Iterable<T> { // Array<T>, 
//   [n: number]: T;
//   get length(): number {
//     return new Reducer(this, (acc: number) => acc + 1, 1).return().value;
//   };
//   set length(length: number) {
//     throw new Error("Method not implemented.");
//   };
//   toString(): string {
//     return new ToStringReducer(this).return().value;
//   }
//   toLocaleString(): string {
//     return new ToLocaleStringReducer(this).return().value;
//   }
//   pop(): T | undefined {
//     throw new Error("Method not implemented.");
//   }
//   push(...items:  T[]): number {
//     throw new Error("Method not implemented.");
//   }
//   concat(...items: (T | ConcatArray<T>)[]):  IterableIterator<T> {
//     return new ConcatIterableIterator(this, ...items);
//   }
//   join(separator?: string): string {
//     return new JoinReducer(this, separator).return().value;
//   }
//   reverse():  IterableIterator<T> {
//     throw new Error("Method not implemented.");
//   }
//   shift(): T | undefined {
//     throw new Error("Method not implemented.");
//   }
//   slice(start?: number, end?: number):  IterableIterator<T> {
//     return new SliceIterableIterator(this, start, end);
//   }
//   sort(compareFn?: ((a: T, b: T) => number) | undefined): this {
//     throw new Error("Method not implemented.");
//   }
//   splice(start: number, deleteCount: number, ...items:  T[]):  IterableIterator<T> {
//     throw new Error("Method not implemented.");
//   }
//   unshift(...items:  T[]): number {
//     throw new Error("Method not implemented.");
//   }
//   indexOf(searchElement: T, fromIndex?: number): number {
//     return new IndexOfReducer(this, searchElement).return().value;
//   }
//   lastIndexOf(searchElement: T, fromIndex?: number): number {
//     return new LastIndexOfReducer(this, searchElement).return().value;
//   }
//   every(callbackfn: (value: T, index: number, array:  IterableIterator<T>) => unknown, thisArg?: any): boolean {
//     return new EveryReducer(this, callbackfn).return().value;
//   }
//   some(callbackfn: (value: T, index: number, array:  IterableIterator<T>) => unknown, thisArg?: any): boolean {
//     return new SomeReducer(this, callbackfn).return().value;
//   }
//   forEach(callbackfn: (value: T, index: number, array:  IterableIterator<T>) => void, thisArg?: any): void {
//     throw new Error("Method not implemented.");
//   }
//   map<U>(callbackfn: (value: T, index: number, array:  IterableIterator<T>) => U, thisArg?: any): U[] {
//     return MapIterableIterator(this, callbackfn);
//   }
//   filter<S extends T>(callbackfn: (value: T, index: number, array:  IterableIterator<T>) => value is S, thisArg?: any): S[];
//   filter(callbackfn: (value: T, index: number, array:  IterableIterator<T>) => unknown, thisArg?: any):  IterableIterator<T>;
//   filter(callbackfn: any, thisArg?: any) {
//     return new FilterIterableIterator(this, callbackfn);
//   }
//   reduce<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number) => U, initialValue?: U): U {
//     return new Reducer(this, callbackfn, initialValue);
//   }
//   reduceRight<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number) => U, initialValue: U): U {
//     throw new Error("Method not implemented.");
//   }
//   find(predicate: (value: T, index: number, obj:  IterableIterator<T>) => boolean, thisArg?: any): T | undefined {
//     return new FindReducer(this, predicate);
//   }
//   findIndex(predicate: (value: T, index: number, obj:  IterableIterator<T>) => unknown, thisArg?: any): number {
//     return new FindIndexReducer(this, predicate);
//   }
//   fill(value: T, start?: number, end?: number): this {
//     return new FillIterableIterator(this, value, start, end);
//   }
//   copyWithin(target: number, start: number, end?: number | undefined): this {
//     throw new Error("Method not implemented.");
//   }
//   entries(): IterableIterator<[number, T]> {
//     throw new Error("Method not implemented.");
//   }
//   keys(): IterableIterator<number> {
//     return new KeysIterableIterator(this);
//   }
//   values(): IterableIterator<T> {
//     return new ValuesIterableIterator(this);
//   }
//   includes(searchElement: T, fromIndex?: number): boolean {
//     return new IncludesReducer(this, searchElement);
//   }
//   flatMap<U, This = undefined>(callback: (this: This, value: T, index: number, array:  IterableIterator<T>) => U | readonly U[], thisArg?: This | undefined): U[] {
//     return new FlatMapIterableIterator(this, callback);
//   }

//   flat(depth?: number): IterableIterator<T>{
//     return new FlatIterableIterator(this, depth);
//   }
//   [Symbol.unscopables](): { copyWithin: boolean; entries: boolean; fill: boolean; find: boolean; findIndex: boolean; keys: boolean; values: boolean; } {
//     throw new Error("Method not implemented.");
//   }
//   [Symbol.iterator](): IterableIterator<T> {
//     this.values();
//   }
// }