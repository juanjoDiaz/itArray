import JoinReducer from "./Join";
import MapIterableIterator from "../Iterators/Map";

interface Stringifiable {
  toString(): String
}

function isStringifiable(obj: any): obj is Stringifiable {
  return typeof (obj as Stringifiable).toString === 'function';
}

function safeStringify<T>(obj: T): string {
  return isStringifiable(obj)
    ? (obj as Stringifiable).toString() as string
    : String(obj);
}

export default class ToStringReducer<T> extends JoinReducer<String> {
  constructor(source: IterableIterator<T>) {
    super(new MapIterableIterator(source, (val) => safeStringify(val)), ',');
  }

  [Symbol.iterator](): IterableIterator<string> {
    return new JoinReducer(this.source, this.separator);
  }
}