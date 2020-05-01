// import JoinReducer from "./Join";
// import MapIterableIterator from "../Iterators/Map";
// import IterableWithSource from "../IterableWithSource";

// interface Stringifiable {
//   toString(): String
// }

// function isStringifiable(obj: any): obj is Stringifiable {
//   return typeof (obj as Stringifiable).toString === 'function';
// }

// function safeStringify<T>(obj: T): string {
//   return isStringifiable(obj)
//     ? (obj as Stringifiable).toString() as string
//     : String(obj);
// }

// export default class ToStringReducer<T> extends IterableWithSource<T, string> {
//   constructor(source: Iterable<T>) {
//     super(source);
//   }

//   [Symbol.iterator](): Iterator<string> {
//     return new JoinReducer(new MapIterableIterator(this.source, (val) => safeStringify(val)), ',')[Symbol.iterator]();
//   }
// }