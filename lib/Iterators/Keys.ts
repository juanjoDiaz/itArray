import MapIterableIterator from "./Map";

export default class KeysIterableIterator<T> extends MapIterableIterator<T, number> {
  constructor(source: IterableIterator<T>) {
    super(source, (_, i) => i);
  }
}