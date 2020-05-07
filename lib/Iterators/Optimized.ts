import IterableWithSource from "../IterableWithSource";
import MapIterable from "./Map";
import FilterIterable from "./Filter";

export class OptimizedMapIterable<TIn, TOut = TIn> extends MapIterable<TIn, TOut> {
  public fns: Array<(v: any, k: number) => any>;

  constructor(source: Iterable<TIn>, fns: Array<(v: any, k: number) => any>) {
    super(source, (v: any, k: number) => fns.reduce((next, fn) => fn(next, k), v));
    this.fns = fns;
  }

  add<TNewOut>(fn: (v: TOut, k: number) => TNewOut): OptimizedMapIterable<TIn, TNewOut>  {
    return new OptimizedMapIterable(this.source, [...this.fns, fn])
  }
}

export class OptimizedFilterIterable<T> extends FilterIterable<T> {
  public fns: Array<(v: any, k: number) => boolean>;

  constructor(source: Iterable<T>, fns: Array<(v: any, k: number) => boolean>) {
    super(source, (v: any, k: number) => fns.every(fn => fn(v, k)));
    this.fns = fns;
  }

  add(fn: (v: T, k: number) => boolean): OptimizedFilterIterable<T>  {
    return new OptimizedFilterIterable(this.source, [...this.fns, fn])
  }
}

enum StepKind {
  Map,
  Filter,
};

interface Step {
  kind: StepKind;
}

interface MapStep<TIn, TOut> extends Step {
  kind: StepKind.Map;
  fn: (v: TIn, k: number) => TOut;
  index: number;
}

interface FilterStep<T> extends Step {
  kind: StepKind.Filter;
  fn: (v: T, k: number) => boolean;
  index: number;
}

export class OptimizedFilterAndMapIterable<TIn, TOut> extends IterableWithSource<TIn, TOut>  {
  protected steps: Step[];

  constructor(source: Iterable<TIn>, steps: Step[] = []) {
    super(source);
    this.steps = steps;
  }

  withMap<U>(fn: (v: TOut, k: number) => U): OptimizedFilterAndMapIterable<TIn, U> {
    return new OptimizedFilterAndMapIterable(this.source, [...this.steps, { kind: StepKind.Map, fn, index: 0 } as MapStep<TOut, U>])
  }

  withFilter(fn: (v: TOut, k: number) => boolean): OptimizedFilterAndMapIterable<TIn, TOut> {
    return new OptimizedFilterAndMapIterable(this.source, [...this.steps, { kind: StepKind.Filter, fn, index: 0 } as FilterStep<TOut>])
  }

  [Symbol.iterator](): Iterator<TOut> {
    return new OptimizedFilterAndMapIterator(this.source, this.steps);
  }
}

class OptimizedFilterAndMapIterator<TIn, TOut> implements Iterator<TOut, undefined> {
  protected source: Iterator<TIn, TIn>;
  protected steps: Step[];

  constructor(source: Iterable<TIn>, steps: Step[]) {
    this.source = source[Symbol.iterator]();
    this.steps = steps;
  }

  next(): IteratorResult<TOut, undefined> {
    let { done, value } = this.source.next();
    if (done) return { done: true, value: undefined };

    for (let index = 0; index < this.steps.length; index++) {
      // TODO Strongly type this.
      // For now, at least all the type checks were done when creating the iterable
      const step = this.steps[index] as any;
      switch (step.kind) {
        case StepKind.Map:
          value = step.fn(value, step.index++);
          continue;
        case StepKind.Filter:
          while (!step.fn(value, step.index++)) {
            ({ done, value } = this.source.next());
            if (done) return { done: true, value: undefined };
          }
          continue;
      }
    }
    return { done, value: value as any };
  }
}