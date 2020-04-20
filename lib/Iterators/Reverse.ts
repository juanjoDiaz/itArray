// import ValuesIterableIterator from "./ValuesIterableIterator";

// class ReverseIterableIterator<T> extends ValuesIterableIterator<T> {
//   constructor(source: IterableIterator<T>) {
//     super(source);
//   }

//   next(): IteratorResult<T, undefined> {
//     this.source = new ArrayIterable(source.toArray().reverse());
//     this.next = super.next;
//     return this.next();
//   }

//   [Symbol.iterator](): IterableIterator<T> {
//     return new ReverseIterableIterator(this.source);
//   }
// }