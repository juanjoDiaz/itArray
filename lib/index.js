var arr = new ArrayIterable([1,2,3,4,5,6,7,8,9])

class ArrayIterable extends Iterator {
  constructor(source) {
    super(source);
  }

  next() {
    if (this.index >= this.source.length) {
      return { done: true };
    }

    return {
      done: false,
      value: this.source[this.index],
      index: this.index++,
    };
  }
}

// class Iterator {
//   constructor(source) {
//     this.source = source[Symbol.iterator];
//     this.index = 0;
//   }

//   next() {
//     return this.source.next();
//   }

//   [Symbol.iterator]() {
//     return new this.constructor(this.source, this.fn);
//   }

//   toArray() {
//     return new LazyReducer(this, (acc, value) => acc.push(val), []).consume();
//   }

//   // // 

//   // concat(otherIterator) {
//   // }

//   // copyWithin()

//   // map(fn) {
//   //   return new LazyMap(this, fn);
//   // }

//   // filter(fn) {
//   //   return new LazyFilter(this, fn);
//   // }

//   // reduce(fn, initVal) {
//   //   let res = initVal;
//   //   while(this.moveNext()) {
//   //     res = fn(res, this.current(), this.source.i);
//   //   }
//   // }

//   // flatten() {

//   // }
// }

class ConcatIterator extends Iterator {
  constructor(source, ...otherIterators) {
    super(new LazyFlatten(new ArrayIterator([source, ...otherIterators])));
  }
}

// copyWithin

class FillIterator extends MapIterator {
  constructor(source, value, start, end) {
    let fillFn;
    if (!start) {
      if (end) {
        fillFn = (x, i) => i < end ? value : x;
      } else {
        fillFn = (x) => x;
      }
    } else {
      if (end) {
        fillFn = (x, i) => i >= start && i < end ? value : x;
      } else {
        fillFn = (x, i) => i >= start ? value : x;
      }
    }

    super(source, fillFn);
  }
}

class FilterIterator extends Iterator {
  constructor(source, fn) {
    super(source);
    this.fn = fn;
  }

  next() {
    let index, value;
    do {
      let done;
      ({ done, index, value }) = this.source.next();
      if (done) return { done };
    } while (!this.fn(value, index));
    
    return { done, index, value };
  }
}

class EveryReducer extends SomeReducer {
  constructor(source, fn) {
    super(source, (value, index) => !fn(value, index));
  }

  // TODO negate next
}

class FindReducer extends LazyReducer {
  constructor(source, fn) {
    super(source, fn);
  }

  next() {
    const { done, index, value } = this.source.next();
    if (done) return { done };

    this.value = this.fn(this.value, value, index)
    if (this.value) {
      return { done: true, value };
    }

    return {
      done,
      index: this.index += 1,
    };
  }
}

class FindIndexReducer extends FindReducer {
  next() {
    const { done, index, ...other } = super.next();
    if (done) return { done, value: value in other && index };

    return {
      done: done,
      index: this.index = index,
    };
  }
}

class FlatIterator extends Iterator {
  constructor(source) {
    super(source);
  }

  next() {
    if (!this.currentSource) {
      const { done, value } = this.source.next();
      if (done) return { done };
      if (value instanceof Iterator) {
        this.currentSource = value;
      } else if (Array.isArray(value)) {
        this.currentSource = new ArrayIterable(value);
      } else {
        this.currentSource = new ArrayIterable([value]);
      }
    }

    const { done, value } = this.currentSource.next();
    if (done) {
      this.currentSource = undefined;
      return this.next();
    }

    return {
      done: false,
      index: this.i += 1,
      value
    }
  }
}

class FlatMapIterator extends FlatIterator {
  constructor(source, fn) {
    super(new MapIterator(source, fn));
  }
}

class ForEachReducer extends LazyReducer {
  constructor(source, fn) {
    super(source, (_, value, index) => this.fn(value, index), '');
  }
}

class IncludesReducer extends FindReducer {
  constructor(source, value) {
    super(source, (itValue) => value === itValue);
  }

  next() {
    const { done, index, ...other} = super.next();
    if (done) {
      return {
        done: true,
        value: value in other && index
      };
    }

    return {
      done: false,
      index: this.index = sourceNext.index,
      value: false,
    };
  }
}

class IncludesReducer extends FindIndexReducer {
  constructor(source, value) {
    super(source, (itValue) => value === itValue);
  }
}

class JoinReducer extends LazyReducer {
  constructor(source) {
    super(source, LazyJoin.join, '');
  }

  static join(acc, value, i) {
    // Optimize by overriding join
    return (i === 0) ? `${value}` : `${acc}${separator}${value}`;
  }
}

class KeysIterator extends MapIterator {
  constructor(source) {
    super(source, (_, i) => i);
  }
}

class LastIndexOfReducer extends LazyReducer {
  constructor(source, fn) {
    super(source, fn);
  }

  next() {
    const { done, index, value } = this.source.next();
    if (done) return { done, value };

    this.value = this.fn(this.value, value, index);
    this.index += 1;

    return {
      done: false,
      value: this.value ? this.index : value,
      index: this.index,
    };
  }
}

class MapIterator extends Iterator {
  constructor(source, fn) {
    super(source);
    this.fn = fn;
  }

  next() {
    const { done, index, value } = this.source.next();
    if (done) return { done };

    return {
      done,
      index: this.index = index,
      value: this.fn(value, index)
    }
  }
}

// pop

// push

class LazyReducer {
  constructor(source, fn, initVal) {
    super(source);
    this.fn = fn;
    this.value = initVal;
    this.index = 0;
  }

  next() {
    const { done, index, value } = this.source.next();
    if (done) return { done, value: this.value };

    this.value = this.fn(this.value, value, index)
    return {
      done,
      index: this.index += 1,
      value: this.value,
    };
  }

  consume() {
    while(!this.next().done);
    return this.value;
  }
}

class ReduceRightReducer extends LazyReducer {
  next() {
    this.source = new ArrayIterable(source.toArray().reverse());
    this.next = super.next;
    return this.next();
  }
}

class ReverseIterator extends Iterator {
  constructor(source) {
    super(source);
  }

  next() {
    this.source = new ArrayIterable(source.toArray().reverse());
    this.next = super.next;
    return this.next();
  }
}

// shift

class SliceIterator extends Iterator {
  constructor(source, begin, end) {
    super(source);
    this.begin = begin;
    this.end = end;
  }

  next() {
    if (this.start) {
      while (this.source.index < this.start) {
        if (this.source.next().done) return { done: true };
      }
    }

    if (this.end && this.source.index >= this.end) {
      return { done: true };
    }

    const { done, value } = this.source.next();
    if (done) return { done };

    return {
      done,
      index: this.index +=1,
      value,
    }
  }
}

class SomeReducer extends FindReducer {
  constructor(source, fn) {
    super(source, (value, index) => fn(value, index));
  }

  next() {
    const { done, ...other } = super.next();
    if (done) return { done, value: value in other };

    return {
      done,
      index: this.index += 1,
      value: true,
    };
  }
}

// sort()

// splice(start[, deleteCount[, item1[, item2[, ...]]]])

class ToLocaleStringReducer extends JoinReducer {
  constructor(source, options) {
    super(new MapIterator(source, (val) => val && val.toLocaleString
      ? val.toLocaleString(val, options)
      : String.toLocaleString(val)
    ), ',');
  }
}

// toSource()

class ToStringReducer extends JoinReducer {
  constructor(source) {
    super(new MapIterator(source, (val) => val && val.toString
      ? val.toString(val)
      : String.toString(val)
    ), ',');
  }
}

class UnshiftIterator extends ConcatIterator {
  constructor(source, ...values) {
    super(...values, source);
  }
}

class ValuesIterator extends Iterator {}