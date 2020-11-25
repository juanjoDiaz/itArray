import TransArray from "./TransArray";
import _ from 'lodash';
// import ConcatIterable from "./Iterators/Concat";

const Benchmark = require('benchmark');

function mapSuite<T>(src: Array<T>) {
  return new Benchmark.Suite()
    .add('TransArray#map', () => new TransArray(src).map((v, k) => `K: ${k} -> V: ${v}`).toArray())
    .add('Lodash#map', () => _.map(src, (v, k) => `K: ${k} -> V: ${v}`))
    .add('Array#map', () => src.map((v, k) => `K: ${k} -> V: ${v}`))
    .on('cycle', (event: any) => console.log(String(event.target)))
    // .on('complete', () => console.log('Fastest is ' + suite.filter('fastest').map('name')))
}

function keysSuite<T>(src: Array<T>) {
  return new Benchmark.Suite()
    .add('TransArray#keys', () => new TransArray(src).keys().toArray())
    .add('Lodash#keys', () => _.keys(src))
    .add('Array#keys', () => iterableToArray(src.keys()))
    .on('cycle', (event: any) => console.log(String(event.target)))
    // .on('complete', () => console.log('Fastest is ' + suite.filter('fastest').map('name')))
}

function valuesSuite<T>(src: Array<T>) {
  return new Benchmark.Suite()
    .add('TransArray#values', () => new TransArray(src).values().toArray())
    .add('Lodash#values', () => _.values(src))
    .add('Array#values', () => iterableToArray(src.values()))
    .on('cycle', (event: any) => console.log(String(event.target)))
    // .on('complete', () => console.log('Fastest is ' + suite.filter('fastest').map('name')))
}

function entriesSuite<T>(src: Array<T>) {
  return new Benchmark.Suite()
    .add('TransArray#entries', () => new TransArray(src).entries().toArray())
    .add('Lodash#entries', () => _.entries(src))
    .add('Array#entries', () => iterableToArray(src.entries()))
    .on('cycle', (event: any) => console.log(String(event.target)))
    // .on('complete', () => console.log('Fastest is ' + suite.filter('fastest').map('name')))
}

// fill

function filterSuite(src: Array<number>) {
  return new Benchmark.Suite()
    .add('TransArray#filter', () => new TransArray(src).filter((v, k) => v % 2 === 0).toArray())
    .add('Lodash#filter', () => _.map(src, (v, k) => `K: ${k} -> V: ${v}`))
    .add('Array#filter', () => src.map((v, k) => `K: ${k} -> V: ${v}`))
    .on('cycle', (event: any) => console.log(String(event.target)))
    // .on('complete', () => console.log('Fastest is ' + suite.filter('fastest').map('name')))
}

function flatSuite(src: Array<number>) {
  let nestedSrc: Array<number | Array<number>> = [];
  let count = 0 ;
  while (true) {
    const arr = Array(Math.floor(Math.random() * src.length * Math.random()));
    nestedSrc.push(arr);
    if ((count += arr.length) >= src.length) break;
  }

  return new Benchmark.Suite()
    .add('TransArray#flat', () => new TransArray(nestedSrc).flat().toArray())
    // .add('FlatIterable#flat', () => new FlatIterable(nestedSrc)))
    .add('Lodash#flat', () => _.flatten(nestedSrc))
    .add('Array#flat', () => nestedSrc.flat())
    .on('cycle', (event: any) => console.log(String(event.target)))
    // .on('complete', () => console.log('Fastest is ' + suite.filter('fastest').map('name')))
}

function concatSuite(src: Array<number>) {
  let nestedSrc: Array<number | Array<number>> = [];
  let count = 0 ;
  while (true) {
    const arr = Array(Math.floor(Math.random() * src.length * Math.random()));
    nestedSrc.push(count);
    nestedSrc.push(arr);
    if ((count += arr.length) >= src.length) break;
  }

  return new Benchmark.Suite()
    .add('TransArray#concat', () => new TransArray<number>([]).concat(...nestedSrc).toArray())
    // .add('ConcatIterable#concat', () => new ConcatIterable<number>([], ...nestedSrc)))
    .add('Lodash#concat', () => _.concat([], ...nestedSrc))
    .add('Array#concat', () => ([] as number[]).concat(...nestedSrc))
    .on('cycle', (event: any) => console.log(String(event.target)))
    // .on('complete', () => console.log('Fastest is ' + suite.filter('fastest').map('name')))
}

function reduceSuite(src: Array<number>) {
  return new Benchmark.Suite()
    .add('TransArray#reduce', () => new TransArray(src).reduce((acc, v, k) => acc + v, 0))
    .add('Lodash#reduce', () => _.reduce(src, (acc, v, k) => acc + v, 0))
    .add('Array#reduce', () => src.reduce((acc, v, k) => acc + v, 0))
    .on('cycle', (event: any) => console.log(String(event.target)))
    // .on('complete', () => console.log('Fastest is ' + suite.filter('fastest').map('name')))
}

function joinSuite(src: Array<number>) {
  return new Benchmark.Suite()
    .add('TransArray#join', () => new TransArray(src).join('-'))
    .add('Lodash#join', () => _.join(src, '-'))
    .add('Array#join', () => src.join('-'))
    .on('cycle', (event: any) => console.log(String(event.target)))
    // .on('complete', () => console.log('Fastest is ' + suite.filter('fastest').map('name')))
}

function forEachSuite(src: Array<number>) {
  return new Benchmark.Suite()
    .add('TransArray#forEach', () => new TransArray(src).forEach((v, k) => v + 1 % 2))
    .add('Lodash#forEach', () => _.forEach(src, (v, k) => v + 1 % 2))
    .add('Array#forEach', () => src.forEach((v, k) => v + 1 % 2))
    .on('cycle', (event: any) => console.log(String(event.target)))
    // .on('complete', () => console.log('Fastest is ' + suite.filter('fastest').map('name')))
}

function indexOfSuite(src: Array<number>) {
  return new Benchmark.Suite()
    .add('TransArray#indexOf', () => new TransArray(src).indexOf(src.length * Math.random()))
    .add('Lodash#indexOf', () => _.indexOf(src, src.length * Math.random()))
    .add('Array#indexOf', () => src.indexOf(src.length * Math.random()))
    .on('cycle', (event: any) => console.log(String(event.target)))
    // .on('complete', () => console.log('Fastest is ' + suite.filter('fastest').map('name')))
}

function includesSuite(src: Array<number>) {
  return new Benchmark.Suite()
    .add('TransArray#includes', () => new TransArray(src).includes(src.length * Math.random()))
    .add('Lodash#includes', () => _.includes(src, src.length * Math.random()))
    .add('Array#includes', () => src.includes(src.length * Math.random()))
    .on('cycle', (event: any) => console.log(String(event.target)))
    // .on('complete', () => console.log('Fastest is ' + suite.filter('fastest').map('name')))
}

function findSuite(src: Array<number>) {
  return new Benchmark.Suite()
    .add('TransArray#find', () => new TransArray(src).find(v => v > src.length * Math.random()))
    .add('Lodash#find', () => _.find(src, v => v > src.length * Math.random()))
    .add('Array#find', () => src.find(v => v > src.length * Math.random()))
    .on('cycle', (event: any) => console.log(String(event.target)))
    // .on('complete', () => console.log('Fastest is ' + suite.filter('fastest').map('name')))
}

function findIndexSuite(src: Array<number>) {
  return new Benchmark.Suite()
    .add('TransArray#findIndex', () => new TransArray(src).findIndex(v => v > src.length * Math.random()))
    .add('Lodash#findIndex', () => _.findIndex(src, v => v > src.length * Math.random()))
    .add('Array#findIndex', () => src.findIndex(v => v > src.length * Math.random()))
    .on('cycle', (event: any) => console.log(String(event.target)))
    // .on('complete', () => console.log('Fastest is ' + suite.filter('fastest').map('name')))
}

function everySuite(src: Array<number>) {
  return new Benchmark.Suite()
    .add('TransArray#every', () => new TransArray(src).every(v => v > src.length * Math.random()))
    .add('Lodash#every', () => _.every(src, v => v > src.length * Math.random()))
    .add('Array#every', () => src.every(v => v > src.length * Math.random()))
    .on('cycle', (event: any) => console.log(String(event.target)))
    // .on('complete', () => console.log('Fastest is ' + suite.filter('fastest').map('name')))
}

function someSuite(src: Array<number>) {
  return new Benchmark.Suite()
    .add('TransArray#some', () => new TransArray(src).some(v => v > src.length * Math.random()))
    .add('Lodash#some', () => _.some(src, v => v > src.length * Math.random()))
    .add('Array#some', () => src.some(v => v > src.length * Math.random()))
    .on('cycle', (event: any) => console.log(String(event.target)))
    // .on('complete', () => console.log('Fastest is ' + suite.filter('fastest').map('name')))
}

// function mapAndFilterSuite(src: Array<number>) {
//   return new Benchmark.Suite()
//     .add('TransArray#map&filter', () => new TransArray(src).map((v, k) => ({k, v })).filter((v, k) => v.v % 2 === 0)))
//     // .add('MapIterable#map&filter', () => new FilterIterable(new MapIterable(src, (v, k) => ({k, v })), (v, k) => v.v % 2 === 0)))
//     .add('Lodash#map&filter', () => _.map(src, (v, k) => ({k, v })).filter((v, k) => v.v % 2 === 0))
//     .add('Array#map&filter', () => src.map((v, k) => ({k, v })).filter((v, k) => v.v % 2 === 0))
//     .on('cycle', (event: any) => console.log(String(event.target)))
//     // .on('complete', () => console.log('Fastest is ' + suite.filter('fastest').map('name')))
// }

function mapChainSuite(src: Array<number>) {
  return new Benchmark.Suite()
    .add('TransArray#mapChain', () => new TransArray<number>(src)
      .map((v, k) => ({ k, v }))
      .map(x => x.v)
      .map((v, k) => ({ k, v }))
      .map(x => x.v)
      .map((v, k) => ({ k, v }))
      .map(x => x.v)
      .toArray()
    )
    .add('TransArrayOptimized#mapChain', () => new TransArray<number>(src)
      .optimizedmap((v, k) => ({ k, v }))
      .optimizedmap(x => x.v)
      .optimizedmap((v, k) => ({ k, v }))
      .optimizedmap(x => x.v)
      .optimizedmap((v, k) => ({ k, v }))
      .optimizedmap(x => x.v)
      .toArray()
    )
    .add('TransArrayOptimized2#mapChain', () => new TransArray<number>(src)
      .optimized2map((v, k) => ({ k, v }))
      .optimized2map(x => x.v)
      .optimized2map((v, k) => ({ k, v }))
      .optimized2map(x => x.v)
      .optimized2map((v, k) => ({ k, v }))
      .optimized2map(x => x.v)
      .toArray()
    )
    .add('Lodash#mapChain', () => _
      .map(src, (v, k) => ({ k, v }))
      .map(x => x.v)
      .map((v, k) => ({ k, v }))
      .map(x => x.v)
      .map((v, k) => ({ k, v }))
      .map(x => x.v)
    )
    .add('Array#mapChain', () => src
      .map((v, k) => ({ k, v }))
      .map(x => x.v)
      .map((v, k) => ({ k, v }))
      .map(x => x.v)
      .map((v, k) => ({ k, v }))
      .map(x => x.v)
    )
    .on('cycle', (event: any) => console.log(String(event.target)))
    // .on('complete', () => console.log('Fastest is ' + suite.filter('fastest').map('name')))
}


function filterChainSuite(src: Array<number>) {
  return new Benchmark.Suite()
    .add('TransArray#filterChain', () => new TransArray(src)
      .filter((v, k) => v > 0)
      .filter((v, k) => v % 2 === 0)
      .filter((v, k) => v > 0)
      .filter((v, k) => v % 2 === 0)
      .filter((v, k) => v > 0)
      .filter((v, k) => v % 2 === 0)
      .toArray()
    )
    .add('TransArrayOptimized#filterChain', () => new TransArray(src)
      .optimizedfilter((v, k) => v > 0)
      .optimizedfilter((v, k) => v % 2 === 0)
      .optimizedfilter((v, k) => v > 0)
      .optimizedfilter((v, k) => v % 2 === 0)
      .optimizedfilter((v, k) => v > 0)
      .optimizedfilter((v, k) => v % 2 === 0)
      .toArray()
    )
    .add('TransArrayOptimized2#filterChain', () => new TransArray(src)
      .optimized2filter((v, k) => v > 0)
      .optimized2filter((v, k) => v % 2 === 0)
      .optimized2filter((v, k) => v > 0)
      .optimized2filter((v, k) => v % 2 === 0)
      .optimized2filter((v, k) => v > 0)
      .optimized2filter((v, k) => v % 2 === 0)
      .toArray()
    )
    .add('Lodash#filterChain', () => 
      _.filter(src, (v, k) => v > 0)
      .filter((v, k) => v % 2 === 0)
      .filter((v, k) => v > 0)
      .filter((v, k) => v % 2 === 0)
      .filter((v, k) => v > 0)
      .filter((v, k) => v % 2 === 0)
    )
    .add('Array#filterChain', () => src
      .filter((v, k) => v > 0)
      .filter((v, k) => v % 2 === 0)
      .filter((v, k) => v > 0)
      .filter((v, k) => v % 2 === 0)
      .filter((v, k) => v > 0)
      .filter((v, k) => v % 2 === 0)
    )
    .on('cycle', (event: any) => console.log(String(event.target)))
    // .on('complete', () => console.log('Fastest is ' + suite.filter('fastest').map('name')))
}

function mapAndFiltersSuite(src: Array<number>) {
  return new Benchmark.Suite()
    .add('TransArray#mapAndFilters', () => new TransArray<number>(src)
      .map((v, k) => ({ k, v }))
      .filter((v, k) => v.v !== k)
      .map(x => x.v)
      .filter((v, k) => v !== k)
      .map((v, k) => ({ k, v }))
      .filter((v, k) => v.v !== k)
      .map(x => x.v)
      .filter((v, k) => v !== k)
      .map((v, k) => ({ k, v }))
      .filter((v, k) => v.v !== k)
      .map(x => x.v)
      .toArray()
    )
    .add('TransArrayOptimized#mapAndFilters', () => new TransArray<number>(src)
      .optimizedmap((v, k) => ({ k, v }))
      .optimizedfilter((v, k) => v.v !== k)
      .optimizedmap(x => x.v)
      .optimizedfilter((v, k) => v !== k)
      .optimizedmap((v, k) => ({ k, v }))
      .optimizedfilter((v, k) => v.v !== k)
      .optimizedmap(x => x.v)
      .optimizedfilter((v, k) => v !== k)
      .optimizedmap((v, k) => ({ k, v }))
      .optimizedfilter((v, k) => v.v !== k)
      .optimizedmap(x => x.v)
      .toArray()
    )
    .add('TransArrayOptimized2#mapAndFilters', () => new TransArray<number>(src)
      .optimized2map((v, k) => ({ k, v }))
      .optimized2filter((v, k) => v.v !== k)
      .optimized2map(x => x.v)
      .optimized2filter((v, k) => v !== k)
      .optimized2map((v, k) => ({ k, v }))
      .optimized2filter((v, k) => v.v !== k)
      .optimized2map(x => x.v)
      .optimized2filter((v, k) => v !== k)
      .optimized2map((v, k) => ({ k, v }))
      .optimized2filter((v, k) => v.v !== k)
      .optimized2map(x => x.v)
      .toArray()
    )
    .add('Lodash#mapAndFilters', () => _
      .map(src, (v, k) => ({ k, v }))
      .filter((v, k) => v.v !== k)
      .map(x => x.v)
      .filter((v, k) => v !== k)
      .map((v, k) => ({ k, v }))
      .filter((v, k) => v.v !== k)
      .map(x => x.v)
      .filter((v, k) => v !== k)
      .map((v, k) => ({ k, v }))
      .filter((v, k) => v.v !== k)
      .map(x => x.v)
    )
    .add('Array#mapAndFilters', () => src
      .map((v, k) => ({ k, v }))
      .filter((v, k) => v.v !== k)
      .map(x => x.v)
      .filter((v, k) => v !== k)
      .map((v, k) => ({ k, v }))
      .filter((v, k) => v.v !== k)
      .map(x => x.v)
      .filter((v, k) => v !== k)
      .map((v, k) => ({ k, v }))
      .filter((v, k) => v.v !== k)
      .map(x => x.v)
    )
    .on('cycle', (event: any) => console.log(String(event.target)))
    // .on('complete', () => console.log('Fastest is ' + suite.filter('fastest').map('name')))
}

function slowMap<TIn, TOut>(fn: (v: TIn, k: number) => TOut) {
  return (v: TIn, k: number) => {
    let r = 0;
    for (let i = 0; i < 10000; i++) r += i;
    return fn(v, k);
  }
}
function slowMapChainSuite(src: Array<number>) {
  return new Benchmark.Suite()
    .add('TransArray#mapChain', () => new TransArray<number>(src)
      .map(slowMap((v, k) => ({ k, v })))
      .map(slowMap(x => x.v))
      .map(slowMap((v, k) => ({ k, v })))
      .map(slowMap(x => x.v))
      .map(slowMap((v, k) => ({ k, v })))
      .map(slowMap(x => x.v))
      .toArray()
    )
    .add('TransArrayOptimized#mapChain', () => new TransArray<number>(src)
      .optimizedmap(slowMap((v, k) => ({ k, v })))
      .optimizedmap(slowMap(x => x.v))
      .optimizedmap(slowMap((v, k) => ({ k, v })))
      .optimizedmap(slowMap(x => x.v))
      .optimizedmap(slowMap((v, k) => ({ k, v })))
      .optimizedmap(slowMap(x => x.v))
      .toArray()
    )
    .add('TransArrayOptimized2#mapChain', () => new TransArray<number>(src)
      .optimized2map(slowMap((v, k) => ({ k, v })))
      .optimized2map(slowMap(x => x.v))
      .optimized2map(slowMap((v, k) => ({ k, v })))
      .optimized2map(slowMap(x => x.v))
      .optimized2map(slowMap((v, k) => ({ k, v })))
      .optimized2map(slowMap(x => x.v))
      .toArray()
    )
    .add('Lodash#mapChain', () => _
      .map(src, slowMap((v, k) => ({ k, v })))
      .map(slowMap(x => x.v))
      .map(slowMap((v, k) => ({ k, v })))
      .map(slowMap(x => x.v))
      .map(slowMap((v, k) => ({ k, v })))
      .map(slowMap(x => x.v))
    )
    .add('Array#mapChain', () => src
      .map(slowMap((v, k) => ({ k, v })))
      .map(slowMap(x => x.v))
      .map(slowMap((v, k) => ({ k, v })))
      .map(slowMap(x => x.v))
      .map(slowMap((v, k) => ({ k, v })))
      .map(slowMap(x => x.v))
    )
    .on('cycle', (event: any) => console.log(String(event.target)))
    // .on('complete', () => console.log('Fastest is ' + suite.filter('fastest').map('name')))
}

function slowFilter<TIn, TOut>(fn: (v: TIn, k: number) => boolean) {
  return (v: TIn, k: number) => {
    let r = 0;
    for (let i = 0; i < 10000; i++) r += i;
    return fn(v, k);
  }
}
function slowFilterChainSuite(src: Array<number>) {
  return new Benchmark.Suite()
    .add('TransArray#filterChain', () => new TransArray(src)
      .filter(slowFilter((v, k) => v > 0))
      .filter(slowFilter((v, k) => v % 2 === 0))
      .filter(slowFilter((v, k) => v > 0))
      .filter(slowFilter((v, k) => v % 2 === 0))
      .filter(slowFilter((v, k) => v > 0))
      .filter(slowFilter((v, k) => v % 2 === 0))
      .toArray()
    )
    .add('TransArrayOptimized#filterChain', () => new TransArray(src)
      .optimizedfilter(slowFilter((v, k) => v > 0))
      .optimizedfilter(slowFilter((v, k) => v % 2 === 0))
      .optimizedfilter(slowFilter((v, k) => v > 0))
      .optimizedfilter(slowFilter((v, k) => v % 2 === 0))
      .optimizedfilter(slowFilter((v, k) => v > 0))
      .optimizedfilter(slowFilter((v, k) => v % 2 === 0))
      .toArray()
    )
    .add('TransArrayOptimized2#filterChain', () => new TransArray(src)
      .optimized2filter(slowFilter((v, k) => v > 0))
      .optimized2filter(slowFilter((v, k) => v % 2 === 0))
      .optimized2filter(slowFilter((v, k) => v > 0))
      .optimized2filter(slowFilter((v, k) => v % 2 === 0))
      .optimized2filter(slowFilter((v, k) => v > 0))
      .optimized2filter(slowFilter((v, k) => v % 2 === 0))
      .toArray()
    )
    .add('Lodash#filterChain', () => 
      _.filter(src, slowFilter((v, k) => v > 0))
      .filter(slowFilter((v, k) => v % 2 === 0))
      .filter(slowFilter((v, k) => v > 0))
      .filter(slowFilter((v, k) => v % 2 === 0))
      .filter(slowFilter((v, k) => v > 0))
      .filter(slowFilter((v, k) => v % 2 === 0))
    )
    .add('Array#filterChain', () => src
      .filter(slowFilter((v, k) => v > 0))
      .filter(slowFilter((v, k) => v % 2 === 0))
      .filter(slowFilter((v, k) => v > 0))
      .filter(slowFilter((v, k) => v % 2 === 0))
      .filter(slowFilter((v, k) => v > 0))
      .filter(slowFilter((v, k) => v % 2 === 0))
    )
    .on('cycle', (event: any) => console.log(String(event.target)))
    // .on('complete', () => console.log('Fastest is ' + suite.filter('fastest').map('name')))
}

function slowMapAndFiltersSuite(src: Array<number>) {
  return new Benchmark.Suite()
    .add('TransArray#mapAndFilters', () => new TransArray<number>(src)
      .map(slowMap((v, k) => ({ k, v })))
      .filter(slowFilter((v, k) => v.v !== k))
      .map(slowMap(x => x.v))
      .filter(slowFilter((v, k) => v !== k))
      .map(slowMap((v, k) => ({ k, v })))
      .filter(slowFilter((v, k) => v.v !== k))
      .map(slowMap(x => x.v))
      .filter(slowFilter((v, k) => v !== k))
      .map(slowMap((v, k) => ({ k, v })))
      .filter(slowFilter((v, k) => v.v !== k))
      .map(slowMap(x => x.v))
      .toArray()
    )
    .add('Lodash#mapAndFilters', () => _
      .map(src, slowMap((v, k) => ({ k, v })))
      .filter(slowFilter((v, k) => v.v !== k))
      .map(slowMap(x => x.v))
      .filter(slowFilter((v, k) => v !== k))
      .map(slowMap((v, k) => ({ k, v })))
      .filter(slowFilter((v, k) => v.v !== k))
      .map(slowMap(x => x.v))
      .filter(slowFilter((v, k) => v !== k))
      .map(slowMap((v, k) => ({ k, v })))
      .filter(slowFilter((v, k) => v.v !== k))
      .map(slowMap(x => x.v))
    )
    .add('Array#mapAndFilters', () => src
      .map(slowMap((v, k) => ({ k, v })))
      .filter(slowFilter((v, k) => v.v !== k))
      .map(slowMap(x => x.v))
      .filter(slowFilter((v, k) => v !== k))
      .map(slowMap((v, k) => ({ k, v })))
      .filter(slowFilter((v, k) => v.v !== k))
      .map(slowMap(x => x.v))
      .filter(slowFilter((v, k) => v !== k))
      .map(slowMap((v, k) => ({ k, v })))
      .filter(slowFilter((v, k) => v.v !== k))
      .map(slowMap(x => x.v))
    )
    .on('cycle', (event: any) => console.log(String(event.target)))
    // .on('complete', () => console.log('Fastest is ' + suite.filter('fastest').map('name')))
}

function allSuite(src: Array<number>) {
  let nestedSrc: Array<number | Array<number>> = [];
  let count = 0 ;
  while (true) {
    const arr = Array(Math.floor(Math.random() * src.length * Math.random()));
    nestedSrc.push(count);
    nestedSrc.push(arr);
    if ((count += arr.length) >= src.length) break;
  }

  return new Benchmark.Suite()
    .add('TransArray#all', () => new TransArray<number>([])
      .concat(...nestedSrc)
      .map((v, k) => ({ k, v }))
      .filter(x => x.v % 2 === 0)
      .map(x => ([x.v]))
      .flat()
      .reduce((acc, v) => acc + v, 0)
    )
    .add('Lodash#all', () => _
      .concat([], ...nestedSrc)
      .map((v, k) => ({ k, v }))
      .filter(x => x.v % 2 === 0)
      .map(x => ([x.v]))
      .flat()
      .reduce((acc, v) => acc + v, 0)
    )
    .add('Array#all', () => ([] as number[])
      .concat(...nestedSrc)
      .map((v, k) => ({ k, v }))
      .filter(x => x.v % 2 === 0)
      .map(x => ([x.v]))
      .flat()
      .reduce((acc, v) => acc + v, 0)
    )
    .on('cycle', (event: any) => console.log(String(event.target)))
    // .on('complete', () => console.log('Fastest is ' + suite.filter('fastest').map('name')))
}

console.table({
  map: race(mapSuite),
  keys: race(keysSuite),
  values: race(valuesSuite),
  entries: race(entriesSuite),
  filter: race(filterSuite),
  flat: race(flatSuite),
  concat: race(concatSuite),
  reduce: race(reduceSuite),
  join: race(joinSuite),
  forEach: race(forEachSuite),
  indexOf: race(indexOfSuite),
  includes: race(includesSuite),
  findIndex : race(findIndexSuite),
  every : race(everySuite),
  some : race(someSuite),
  find: race(findSuite),
});

console.table({
  // // Combined
  mapChain: race(mapChainSuite),
  filterChain: race(filterChainSuite),
  mapAndFilter: race(mapAndFiltersSuite),
  // // Slow
  slowMapChain: race(slowMapChainSuite),
  slowFilterChain: race(slowFilterChainSuite),
  slowMapAndFilter: race(slowMapAndFiltersSuite),
  all: race(allSuite),
})

function race(suite: any) {
  let res = {} as any;
  for (let index = 10; index <= 1000; index = index * 10) {
    console.log(`TESTING ${index}`);
    const src = Array(index).fill(0).map((v, k) => k + 1);
    const suiteResults = suite(src).run();
    for (let i = 0; i < suiteResults.length; i++) {
      const test = suiteResults[i];
      const fastest = suiteResults.filter('fastest')[0];
      const opsPerSec = test.hz.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      const relativeToFastest = test.hz === fastest.hz ? '-' : `- ${(1 - (test.hz / fastest.hz)).toFixed(2)}`;
      res[`${test.name.split('#')[0]} (${index})`] = `${opsPerSec} (${relativeToFastest})`;
    }
  }
  return res;
}

function iterableToArray<T>(iterable: Iterable<T>) {
  const iterator = iterable[Symbol.iterator]();
  while (!iterator.next().done) {}
  // return
  const arr = [];
  while (true) {
    const { done, value } = iterator.next();
    if (done) return arr;
    arr.push(value);
  }
}