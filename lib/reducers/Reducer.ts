import TransformIterableIterator from "../TransformIterableIterator";

export default class Reducer<TIn, TReturn> extends TransformIterableIterator<TIn, TReturn, TReturn> {
  protected fn: (acc: TReturn, v: TIn, k: number) => TReturn;
  protected initValue: TReturn;
  protected currentValue: TReturn;
  protected index: number = 0;

  constructor(source: IterableIterator<TIn>, fn: (acc: TReturn, v: TIn, k: number) => TReturn, initValue: TReturn) {
    super(source);
    this.fn = fn;
    this.currentValue = this.initValue = initValue;
    this.index = 0;
  }

  next(): IteratorResult<TReturn, TReturn> {
    const { done, value } = this.source.next();
    if (done) return { done: true, value: this.currentValue };

    this.currentValue = this.fn(this.currentValue, value, this.index++);

    return { done: false, value: this.currentValue };
  }

  [Symbol.iterator](): IterableIterator<TReturn> {
    return new Reducer(this.source, this.fn, this.initValue);
  }
}