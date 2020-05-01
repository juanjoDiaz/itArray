// import IterableWithSource from "../IterableWithSource";
// import ConcatIterable from "./Concat";
// import SliceIterable from "./Slice";

// export default class SpliceIterable<T> extends IterableWithSource<T, T> {
//   private begin: number;
//   private deleteCount: number;
//   private items: T[];

//   constructor(source: Iterable<T>, begin?: number, deleteCount?: number, ...items: T[]) {
//     super(source);
//     this.begin = begin || 0;
//     this.deleteCount = deleteCount || 0;
//     this.items = items;
//   }

//   [Symbol.iterator](): Iterator<T> {
//     return new ConcatIterable(
//       new SliceIterable(this.source, 0, this.begin),
//       this.items,
//       new SliceIterable(this.source, this.begin + this.deleteCount),
//     )[Symbol.iterator]();
//   }
// }
