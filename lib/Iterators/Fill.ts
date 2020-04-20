import MapIterableIterator from "./Map";

export default class FillIterableIterator<T> extends MapIterableIterator<T> {
  protected value: T;
  protected start?: number;
  protected end?: number;

  constructor(source: IterableIterator<T>, value: T, start?: number, end?: number) {
    let fillFn;
    if (start) {
      if (end) {
        fillFn = (x: T, i: number) => i >= start && i < end ? value : x;
      } else {
        fillFn = (x: T, i: number) => i >= start ? value : x;
      }
    } else {
      fillFn = () => value;
    }

    super(source, fillFn);
    this.value = value;
    this.start = start;
    this.end = end;
  }

  [Symbol.iterator](): IterableIterator<T> {
    return new FillIterableIterator(this.source, this.value, this.start, this.end);
  }
}