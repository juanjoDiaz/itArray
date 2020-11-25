// // import ArrayTransIterable from "./ArrayTransIterable";
// import MapIterable from "./Iterators/Map";
// import FillIterable from "./Iterators/Fill";
// import FilterIterable from './Iterators/Filter';
// import FlatIterable from './Iterators/Flat';
// import FlatMapIterable from "./Iterators/FlatMap";
// import KeysIterable from './Iterators/Keys';
// import SliceIterable from "./Iterators/Slice";
// import ConcatIterable from "./Iterators/Concat";
// import ValuesIterable from "./Iterators/Values";
// import SpliceIterable from "./Iterators/Splice";
// import ReverseIterable from "./Iterators/Reverse";
// import TransArray from "./TransArray";
// import Reducer from "./reducers/Reducer";
// // import Reducer from "./reducers/Reducer";
// // import FindReducer from "./reducers/Find";
// // import { FindIndexReducer } from "./reducers/FindIndex";
// // import SomeReducer from "./reducers/Some";
// // import IncludesReducer from "./reducers/Includes";
// // import EveryReducer from "./reducers/Every";
// // import JoinReducer from "./reducers/Join";
// // import ToStringReducer from "./reducers/ToString";
// // import ToLocaleStringReducer from "./reducers/ToLocaleString";
// // import { IndexOfReducer } from "./reducers/IndexOf";

// function time(fn: Function) {
//   const startTime = process.hrtime();
//   const result = fn();
//   const time = process.hrtime(startTime);

//   return { result, time };
// }

// function iterableToArray<T>(iterable: Iterable<T>) {
//   const iterator = iterable[Symbol.iterator]();
//   // const arr = [];
//   while (true) {
//     const { done, value } = iterator.next();
//     if (done) return //arr;
//     // arr.push(value);
//   }
// }

// function compare(transIt: any, nativeFn: Function) {
//   const { result: transResult, time: transTime }  = time(() => iterableToArray(transIt));
//   const { result: nativeResult, time: nativeTime }  = time(nativeFn);
//   // throw new Error(`Compare ${transResult} !== ${nativeResult}`)
//   // if (transResult.length !== nativeResult.length) throw new Error(`FAIL: ${transResult} !== ${nativeResult} different lenghts ${transResult.length} !== ${nativeResult.length}`);
//   // for (let index = 0; index < transResult.length; index++) {
//   //   if (transResult[index] !== nativeResult[index]) throw new Error(`FAIL: ${transResult} != ${nativeResult}`);
//   // }

//   // console.log(`TRANS Benchmark took ${transTime[0]} seconds and ${transTime[1]/ 1e6} miliseconds`);
//   // console.log(`NATIVE Benchmark took ${nativeTime[0]} seconds and ${nativeTime[1]/ 1e6} miliseconds`);
//   console.log(`DIFF ${(transTime[0] * 1e6 + transTime[1] / 1e6) / (nativeTime[0] * 1e6 + nativeTime[1] / 1e6)}`)
// }

// // const src = [1,2,3,4,5,6,7,8,9];
// const src = Array(10000000).fill(0).map((v, k) => k + 1);

// console.log("ValuesIterable");
// compare(
//   new ValuesIterable(src),
//   () => iterableToArray(src.values()),
// );

// console.log("MapIterable");
// compare(
//   new MapIterable(src, (v, k) => `K: ${k} -> V: ${v}`),
//   () => src.map((v, k) => `K: ${k} -> V: ${v}`),
// );

// console.log("SliceIterable");
// compare(
//   new SliceIterable(src),
//   () => src.slice(),
// );


// console.log("SliceIterable begin");
// compare(
//   new SliceIterable(src, 3),
//   () => src.slice(3),
// );

// console.log("ConcatIterable");
// compare(
//   new ConcatIterable(src, [10,11,12], [13,14,15]),
//   () => src.concat([10,11,12], [13,14,15]),
// );

// console.log("Fill Iterable");
// let uniqueSrc = src.slice();
// compare(
//   new FillIterable(src, 1000),
//   () => uniqueSrc.fill(1000),
// );

// console.log("FillIterable start");
// uniqueSrc = src.slice();
// compare(
//   new FillIterable(src, 1000, 3),
//   () => uniqueSrc.fill(1000, 3),
// );

// console.log("FillIterable start & end");
// uniqueSrc = src.slice();
// compare(
//   new FillIterable(src, 1000, 3, 6),
//   () => uniqueSrc.fill(1000, 3, 6),
// );

// console.log("FilterIterable value");
// compare(
//   new FilterIterable(src, (v: number, k) => v % 2 === 0),
//   () => src.filter((v: number, k) => v % 2 === 0),
// );

// console.log("FilterIterable key");
// compare(
//   new FilterIterable(src, (v: number, k) => k % 2 === 0),
//   () => src.filter((v: number, k) => k % 2 === 0),
// );

// process.exit(0);

// console.log("FlatIterable");
// const arr9 = new FlatIterable ([1, [2, 3], [4,5,6], 7, [8, 9]]);
// console.log('FIRST ROUND');
// for (const elem of arr9) {
//   console.log(elem);
// }
// console.log('SECOND ROUND');
// for (const elem of arr9) {
//     console.log(elem);
// }

// console.log("FlatIterable: depth");
// const arr33 = new FlatIterable([1, [2, [3]], [[4,[5]],6], 7, [8, 9]], 3);
// console.log('FIRST ROUND');
// for (const elem of arr33) {
//   console.log(elem);
// }
// console.log('SECOND ROUND');
// for (const elem of arr33) {
//     console.log(elem);
// }

// console.log("FlatMapIterable");
// const arr10 = new FlatMapIterable(src, (v, k) => Array(k).fill(v));
// console.log('FIRST ROUND');
// for (const elem of arr10) {
//   console.log(elem);
// }
// console.log('SECOND ROUND');
// for (const elem of arr10) {
//     console.log(elem);
// }

// console.log("KeysIterable");
// const arr11 = new KeysIterable(src);
// console.log('FIRST ROUND');
// for (const elem of arr11) {
//   console.log(elem);
// }
// console.log('SECOND ROUND');
// for (const elem of arr11) {
//     console.log(elem);
// }

// console.log("SliceIterable all");
// const arr12 = new SliceIterable(src);
// console.log('FIRST ROUND');
// for (const elem of arr12) {
//   console.log(elem);
// }
// console.log('SECOND ROUND');
// for (const elem of arr12) {
//     console.log(elem);
// }

// console.log("SliceIterable begin");
// const arr13 = new SliceIterable(src, 3);
// console.log('FIRST ROUND');
// for (const elem of arr13) {
//   console.log(elem);
// }
// console.log('SECOND ROUND');
// for (const elem of arr13) {
//     console.log(elem);
// }

// console.log("SliceIterable begin & end");
// const arr14 = new SliceIterable(src, 3, 6);
// console.log('FIRST ROUND');
// for (const elem of arr14) {
//   console.log(elem);
// }
// console.log('SECOND ROUND');
// for (const elem of arr14) {
//     console.log(elem);
// }

// console.log("SpliceIterable all");
// const splice1 = new SpliceIterable(src);
// console.log('FIRST ROUND');
// for (const elem of splice1) {
//   console.log(elem);
// }
// console.log('SECOND ROUND');
// for (const elem of splice1) {
//     console.log(elem);
// }

// console.log("SpliceIterable begin");
// const splice2 = new SpliceIterable(src, 3);
// console.log('FIRST ROUND');
// for (const elem of splice2) {
//   console.log(elem);
// }
// console.log('SECOND ROUND');
// for (const elem of splice2) {
//     console.log(elem);
// }

// console.log("SpliceIterable begin & end");
// const splice3 = new SpliceIterable(src, 3, 6);
// console.log('FIRST ROUND');
// for (const elem of splice3) {
//   console.log(elem);
// }
// console.log('SECOND ROUND');
// for (const elem of splice3) {
//     console.log(elem);
// }

// console.log("SpliceIterable begin & end with inserts");
// const splice4 = new SpliceIterable(src, 3, 6, 10, 11, 12);
// console.log('FIRST ROUND');
// for (const elem of splice4) {
//   console.log(elem);
// }
// console.log('SECOND ROUND');
// for (const elem of splice4) {
//     console.log(elem);
// }

// console.log("Reverse Iterator");
// const arrReversed = new ReverseIterable(src);
// for (const elem of arrReversed) {
//     console.log(elem);
// }



// // console.log("Reduce");
// // const arr17 = new Reducer(arr, (acc, v, k) => acc + v, 0);
// // console.log('FIRST ROUND');
// // console.log(arr17.return());
// // console.log('SECOND ROUND');
// // console.log(arr17.return());

// // console.log("Find Reducer: Found");
// // const arr18 = new FindReducer(arr, (v, k) => v === 5);
// // console.log(arr18.return());

// // console.log("Find Reducer: Not Found");
// // const arr19 = new FindReducer(arr, (v, k) => v === 19);
// // console.log(arr19.return());

// // console.log("Find Index Reducer: Found");
// // const arr20 = new FindIndexReducer(arr, (v, k) => v === 5);
// // console.log(arr20.return(), src.findIndex((v, k) => v === 5));

// // console.log("Find Index Reducer: Not Found");
// // const arr21 = new FindIndexReducer(arr, (v, k) => v === 19);
// // console.log(arr21.return(), src.findIndex((v, k) => v === 19));

// // console.log("Some Reducer: Found");
// // const arr22 = new SomeReducer(arr, (v, k) => v === 5);
// // console.log(arr22.return());

// // console.log("Some Reducer: Not Found");
// // const arr23 = new SomeReducer(arr, (v, k) => v === 19);
// // console.log(arr23.return());

// // console.log("Every Reducer: True");
// // const arr24 = new EveryReducer(arr, (v, k) => Number.isFinite(v));
// // console.log(arr24.return());

// // console.log("Every Reducer: False");
// // const arr25 = new EveryReducer(arr, (v, k) => v === 5);
// // console.log(arr25.return());

// // console.log("IndexOf Index Reducer: Found");
// // const arr26 = new IndexOfReducer(arr, 5);
// // console.log(arr26.return(), src.indexOf(5));

// // console.log("IndexOf Reducer: Not Found");
// // const arr27 = new IndexOfReducer(arr, 19);
// // console.log(arr27.return(), src.indexOf(19));

// // console.log("Includes Reducer: Found");
// // const arr28 = new IncludesReducer(arr, 5);
// // console.log(arr28.return());

// // console.log("Includes Reducer: Not Found");
// // const arr29 = new IncludesReducer(arr, 19);
// // console.log(arr29.return());

// // console.log("Join Reducer");
// // const arr30 = new JoinReducer(arr, '-');
// // console.log(arr30.return());

// // console.log("ToString Reducer");
// // const arr31 = new ToStringReducer(arr);
// // console.log(arr31.return());

// // console.log("ToLocaleString Reducer");
// // const arr32 = new ToLocaleStringReducer(arr);
// // console.log(arr32.return());


// const longSrc = Array(1000).fill(0).map((_, i) => ({ i, test1: 'name1', test2: 'name2', test3: 'name3', test4: 'name4', test5: 'name5' }));

// const transTime = process.hrtime();
// const transducersArray = new TransArray(longSrc)
//   .filter(x => x.i % 2 !== 0)
//   .map(x => x.i * 2)
//   // .map(x => console.log(x));

// const it = transducersArray[Symbol.iterator]();
// while (true) if (it.next().done) break;
// // Array.from(transducersArray)

// const transDiff = process.hrtime(transTime);

// const transComposeTime = process.hrtime();
// const transducerComposesArray = new MapIterable(new FilterIterable(longSrc, (x) => x.i % 2 !== 0), x => x.i * 2)
// const itCompose = transducerComposesArray[Symbol.iterator]();
// while (true) if (itCompose.next().done) break;
// // Array.from(transducersArray)

// const transComposeDiff = process.hrtime(transComposeTime);

// const nativeTime = process.hrtime();
// const nativeArray = longSrc
//   .filter(x => x.i % 2 !== 0)
//   .map(x => x.i * 2)
//   // .map(x => console.log(x));
// const nativeDiff = process.hrtime(nativeTime);

// console.log(`TRANS Benchmark took ${transDiff[0]} seconds and ${transDiff[1]/ 1e6} miliseconds`);
// console.log(`TRANSCOMP Benchmark took ${transComposeDiff[0]} seconds and ${transComposeDiff[1]/ 1e6} miliseconds`);
// console.log(`NATIVE Benchmark took ${nativeDiff[0]} seconds and ${nativeDiff[1]/ 1e6} miliseconds`);