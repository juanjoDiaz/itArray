import JoinReducer from "./Join";
import MapIterableIterator from "../Iterators/Map";

interface LocaleStringifiable {
  toLocaleString(): String
}

function isLocaleStringifiable(obj: any): obj is LocaleStringifiable {
  return typeof (obj as LocaleStringifiable).toLocaleString === 'function';
}

function safeStringify<T>(obj: T): string {
  return isLocaleStringifiable(obj)
    ? (obj as LocaleStringifiable).toLocaleString() as string
    : String(obj);
}

export default class ToLocaleStringReducer<T> extends JoinReducer<String> {
  constructor(source: IterableIterator<T>) {
    super(new MapIterableIterator(source, (val) => safeStringify(val)), ',');
  }

  [Symbol.iterator](): IterableIterator<string> {
    return new JoinReducer(this.source, this.separator);
  }
}