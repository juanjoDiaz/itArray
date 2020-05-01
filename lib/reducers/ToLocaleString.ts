// import JoinReducer from "./Join";
// import MapIterableIterator from "../Iterators/Map";
// import IterableWithSource from "../IterableWithSource";

// interface LocaleStringifiable {
//   toLocaleString(): String
// }

// function isLocaleStringifiable(obj: any): obj is LocaleStringifiable {
//   return typeof (obj as LocaleStringifiable).toLocaleString === 'function';
// }

// function safeStringify<T>(obj: T): string {
//   return isLocaleStringifiable(obj)
//     ? (obj as LocaleStringifiable).toLocaleString() as string
//     : String(obj);
// }

// export default class ToLocaleStringReducer<T> extends IterableWithSource<T, string> {
//   constructor(source: Iterable<T>) {
//     super(source);
//   }

//   [Symbol.iterator](): Iterator<string> {
//     return new JoinReducer(new MapIterableIterator(this.source, (val) => safeStringify(val)), ',')[Symbol.iterator]();
//   }
// }