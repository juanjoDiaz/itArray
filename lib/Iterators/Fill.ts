// import IterableWithSource from "../IterableWithSource";
// import ConcatIterable from "./Concat";
// import SliceIterable from "./Slice";
// import MapIterable from "./Map";
// import RepeatIterable from "../Extensions/Repeat";

// export default class FillIterable<T> extends IterableWithSource<T, T> {
//   protected value: T;
//   protected start?: number;
//   protected end?: number;

//   constructor(source: Iterable<T>, value: T, start?: number, end?: number) {
//     super(source);
//     this.value = value;
//     this.start = start;
//     this.end = end;
//   }

//   [Symbol.iterator](): Iterator<T> {
//     if (this.start === undefined) {
//       return new MapIterable(this.source, () => this.value)[Symbol.iterator]();
//     }

//     if (this.end === undefined) {
//       return new ConcatIterable(
//         new SliceIterable(this.source, 0, this.start),
//         new MapIterable(new SliceIterable(this.source, this.start), () => this.value),
//       )[Symbol.iterator]();
//     }

//     return new ConcatIterable(
//       new SliceIterable(this.source, 0, this.start),
//       new RepeatIterable(this.value, this.end - this.start),
//       new SliceIterable(this.source, this.end),
//     )[Symbol.iterator]();
//   }
// }