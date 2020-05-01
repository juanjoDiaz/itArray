export default function reduce<TIn, TReturn>(source: Iterable<TIn>, fn: (acc: TReturn, v: TIn, k: number) => TReturn, initValue: TReturn): TReturn {
  const it = source[Symbol.iterator]();
  let done, value, index = 0, accumulator = initValue;

  while (({ done, value } = it.next()) && !done) {
    accumulator = fn(accumulator, value, index++);
  }
  return accumulator;
}
