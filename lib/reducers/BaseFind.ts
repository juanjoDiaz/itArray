import TransformIterableIterator from "../TransformIterableIterator";

export default abstract class BaseFindReducer<TIn, TOut> extends TransformIterableIterator<TIn, TOut | undefined, TOut | undefined>{
  protected fn: (v: TIn, k: number) => boolean;
  protected index: number = 0;
  protected found: boolean = false;
  protected foundValue?: TOut;

  constructor(source: IterableIterator<TIn>, fn: (v: TIn, k: number) => boolean) {
    super(source);
    this.fn = fn;
  }

  next(): IteratorResult<TOut | undefined, TOut | undefined> {
    if (this.found) return { done: true, value: this.foundValue };

    const { done, value } = this.source.next();
    if (done) return { done, value: undefined };

    this.found = this.fn(value, this.index);
    
    if (this.found) return { done: true, value: this.foundValue = value };
    this.index += 1;
    return { done: false, value: undefined };
  }

}