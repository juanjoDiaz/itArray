import IterableWithSource from "../IterableWithSource";

enum StepKind {
  Map,
  Filter
};

interface Step {
  kind: StepKind;
}

interface MapStep<TIn, TOut> extends Step {
  kind: StepKind.Map;
  fn: (v: TIn, k: number) => TOut;
}

interface FilterStep<T> extends Step {
  kind: StepKind.Filter;
  fn: (v: T, k: number) => boolean;
}


export default class FilterMapIterable<TIn, TOut> extends IterableWithSource<TIn, TOut>  {
  protected steps: Step[];

  constructor(source: Iterable<TIn>, steps: Step[] = []) {
    super(source);
    this.steps = steps;
  }

  withMap<U>(fn: (v: TOut, k: number) => U) {
    return new FilterMapIterable(this.source, [...this.steps, { kind: StepKind.Map, fn } as MapStep<TOut, U>])
  }

  withFilter(fn: (v: TOut, k: number) => boolean) {
    return new FilterMapIterable(this.source, [...this.steps, { kind: StepKind.Filter, fn } as FilterStep<TOut>])
  }

  [Symbol.iterator](): Iterator<TOut> {
    return new FilterMapIterator(this.source, this.steps);
  }
}

class FilterMapIterator<TIn, TOut> implements Iterator<TOut, undefined> {
  protected source: Iterator<TIn, TIn>;
  protected steps: Step[];
  protected index: number = 0;

  constructor(source: Iterable<TIn>, steps: Step[]) {
    this.source = source[Symbol.iterator]();
    this.steps = steps;
  }

  next(): IteratorResult<TOut, undefined> {
    let done: boolean | undefined, value: any;
    for (let index = 0; index < this.steps.length; index++) {
      // TODO Strongly type this.
      // For now, at least all the type checks were done when creating the iterable
      const step = this.steps[index] as any;
      switch (step.kind) {
        case StepKind.Map:
          value = step.fn(value, this.index - 1);
          continue;
        case StepKind.Filter:
          do {
            ({ done, value } = this.source.next());
            if (done) return { done: true, value: undefined };
          } while (!step.fn(value, this.index++));
          continue;
      }
    }
    return { done, value: value };
  }
}