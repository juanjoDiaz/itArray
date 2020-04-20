import Reducer from "./Reducer";

export default class JoinReducer<T> extends Reducer<T, string> {
  protected separator: string;

  constructor(source: IterableIterator<T>, separator: string = '') {
    const reducer = (acc: string, value: T, index: number) => (index === 0) ? `${value}` : `${acc}${separator}${value}`;
    super(source, reducer, '');
    this.separator = separator;
  }

  [Symbol.iterator](): IterableIterator<string> {
    return new JoinReducer(this.source, this.separator);
  }
}