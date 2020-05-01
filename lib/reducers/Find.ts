interface NotFound {
  index: -1;
}

interface Found<T> {
  index:number;
  value: T
}

type FindResult<T> = Found<T> | NotFound;

export default function find<T>(source: Iterable<T>, fn: (v: T, k: number) => boolean): FindResult<T> {
  const it = source[Symbol.iterator]();
  let done, value, index = 0;

  while (({ done, value} = it.next()) && !done) {
    if (fn(value, index++)) return { index, value: value };
  }
  return { index: -1 };
}
