// import IterableWithSource from "../IterableWithSource";

// export default class SliceIterable<T> extends IterableWithSource<T, T> {
//   private begin?: number;
//   private end?: number;
//   protected index: number = 0;

//   constructor(source: Iterable<T>, begin?: number, end?: number) {
//     super(source);
//     this.begin = begin;
//     this.end = end;
//   }

//   [Symbol.iterator](): Iterator<T> {
//     return new SliceIterator(this.source, this.begin);
//   }
// }

// class SliceIterator<T> implements Iterator<T> {
//   protected source: Iterator<any, T>;
//   private count: number;
//   protected index: number = 0;

//   constructor(source: Iterable<T>, count: number) {
//     this.source = source[Symbol.iterator]();
//     this.count = count;
//   }

//   next(): IteratorResult<T, undefined> {
//     while (this.index < this.count) {
//       if (this.source.next().done) return { done: true, value: undefined };
//       this.index += 1;
//     }

//     const { done, value } = this.source.next();
//     if (done) return { done, value: undefined };

//     this.index++;
//     return { done, value };
//   }
// }