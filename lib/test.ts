import ArrayTransIterableIterator from "./ArrayTransIterableIterator";
import MapIterableIterator from "./Iterators/Map";
import FillIterableIterator from "./Iterators/Fill";
import FlatIterableIterator from './Iterators/Flat';
import FilterIterableIterator from './Iterators/Filter';
import FlatMapIterableIterator from "./Iterators/FlatMap";
import KeysIterableIterator from './Iterators/Keys';
import SliceIterableIterator from "./Iterators/Slice";
import ConcatIterableIterator from "./Iterators/Concat";
import ValuesIterableIterator from "./Iterators/Values";
import Reducer from "./reducers/Reducer";
import FindReducer from "./reducers/Find";
import { FindIndexReducer } from "./reducers/FindIndex";
import SomeReducer from "./reducers/Some";
import IncludesReducer from "./reducers/Includes";
import EveryReducer from "./reducers/Every";
import JoinReducer from "./reducers/Join";
import ToStringReducer from "./reducers/ToString";
import ToLocaleStringReducer from "./reducers/ToLocaleString";
import { IndexOfReducer } from "./reducers/IndexOf";

const src = [1,2,3,4,5,6,7,8,9];

console.log("ArrayValuesIterableIterator");
const arr = new ArrayTransIterableIterator(src);
console.log('FIRST ROUND');
for (const elem of arr) {
  console.log(elem);
}
console.log('SECOND ROUND');
for (const elem of arr) {
    console.log(elem);
}

console.log("ValuesIterableIterator");
const arr2 = new ValuesIterableIterator(arr);
console.log('FIRST ROUND');
for (const elem of arr2) {
  console.log(elem);
}
console.log('SECOND ROUND');
for (const elem of arr2) {
    console.log(elem);
}

// console.log("MapIterableIterator");
// const arr3 = new MapIterableIterator(arr2, (v, k) => `K: ${k} -> V: ${v}`);
// console.log('FIRST ROUND');
// for (const elem of arr3) {
//   console.log(elem);
// }
// console.log('SECOND ROUND');
// for (const elem of arr3) {
//     console.log(elem);
// }

// console.log("FillIterableIterator");
// const arr4 = new FillIterableIterator(arr3, "erased");
// console.log('FIRST ROUND');
// for (const elem of arr4) {
//   console.log(elem);
// }
// console.log('SECOND ROUND');
// for (const elem of arr4) {
//     console.log(elem);
// }

// console.log("FillIterableIterator start");
// const arr5 = new FillIterableIterator(arr3, "erased", 3);
// console.log('FIRST ROUND');
// for (const elem of arr5) {
//   console.log(elem);
// }
// console.log('SECOND ROUND');
// for (const elem of arr5) {
//     console.log(elem);
// }

// console.log("FillIterableIterator end");
// const arr6= new FillIterableIterator(arr3, "erased", 3, 6);
// console.log('FIRST ROUND');
// for (const elem of arr6) {
//   console.log(elem);
// }
// console.log('SECOND ROUND');
// for (const elem of arr6) {
//     console.log(elem);
// }

// console.log("FilterIterableIterator value");
// const arr7 = new FilterIterableIterator(arr, (v: number, k) => v % 2 === 0);
// console.log('FIRST ROUND');
// for (const elem of arr7) {
//   console.log(elem);
// }
// console.log('SECOND ROUND');
// for (const elem of arr7) {
//     console.log(elem);
// }

// console.log("FilterIterableIterator key");
// const arr8 = new FilterIterableIterator(arr, (v: number, k) => k % 2 === 0);
// console.log('FIRST ROUND');
// for (const elem of arr8) {
//   console.log(elem);
// }
// console.log('SECOND ROUND');
// for (const elem of arr8) {
//     console.log(elem);
// }

// console.log("FlatIterableIterator");
// const arr9 = new FlatIterableIterator (new ArrayTransIterableIterator([1, [2, 3], [4,5,6], 7, [8, 9]]));
// console.log('FIRST ROUND');
// for (const elem of arr9) {
//   console.log(elem);
// }
// console.log('SECOND ROUND');
// for (const elem of arr9) {
//     console.log(elem);
// }

// console.log("FlatIterableIterator: depth");
// const arr33 = new FlatIterableIterator(new ArrayTransIterableIterator([1, [2, [3]], [[4,[5]],6], 7, [8, 9]]), 3);
// console.log('FIRST ROUND');
// for (const elem of arr33) {
//   console.log(elem);
// }
// console.log('SECOND ROUND');
// for (const elem of arr33) {
//     console.log(elem);
// }

// console.log("FlatMapIterableIterator");
// const arr10 = new FlatMapIterableIterator(arr, (v, k) => Array(k).fill(v));
// console.log('FIRST ROUND');
// for (const elem of arr10) {
//   console.log(elem);
// }
// console.log('SECOND ROUND');
// for (const elem of arr10) {
//     console.log(elem);
// }

// console.log("KeysIterableIterator");
// const arr11 = new KeysIterableIterator(arr);
// console.log('FIRST ROUND');
// for (const elem of arr11) {
//   console.log(elem);
// }
// console.log('SECOND ROUND');
// for (const elem of arr11) {
//     console.log(elem);
// }

// console.log("SliceIterableIterator all");
// const arr12 = new SliceIterableIterator(arr);
// console.log('FIRST ROUND');
// for (const elem of arr12) {
//   console.log(elem);
// }
// console.log('SECOND ROUND');
// for (const elem of arr12) {
//     console.log(elem);
// }

// console.log("SliceIterableIterator begin");
// const arr13 = new SliceIterableIterator(arr, 3);
// console.log('FIRST ROUND');
// for (const elem of arr13) {
//   console.log(elem);
// }
// console.log('SECOND ROUND');
// for (const elem of arr13) {
//     console.log(elem);
// }

// console.log("SliceIterableIterator begin & end");
// const arr14 = new SliceIterableIterator(arr, 3, 6);
// console.log('FIRST ROUND');
// for (const elem of arr14) {
//   console.log(elem);
// }
// console.log('SECOND ROUND');
// for (const elem of arr14) {
//     console.log(elem);
// }

// console.log("ConcatIterableIterator");
// const arr15 = new ConcatIterableIterator(arr, [10,11,12], [13,14,15]);
// console.log('FIRST ROUND');
// for (const elem of arr15) {
//   console.log(elem);
// }
// console.log('SECOND ROUND');
// for (const elem of arr15) {
//     console.log(elem);
// }

// console.log("ValuesIterableIterator");
// const arr16 = new ValuesIterableIterator(arr);
// console.log('FIRST ROUND');
// for (const elem of arr16) {
//   console.log(elem);
// }
// console.log('SECOND ROUND');
// for (const elem of arr16) {
//     console.log(elem);
// }

// // console.log("Reverse Reducer");
// // const arr33 = new Reverse(arr);
// // console.log(arr33.return());



// console.log("Reduce");
// const arr17 = new Reducer(arr, (acc, v, k) => acc + v, 0);
// console.log('FIRST ROUND');
// console.log(arr17.return());
// console.log('SECOND ROUND');
// console.log(arr17.return());

// console.log("Find Reducer: Found");
// const arr18 = new FindReducer(arr, (v, k) => v === 5);
// console.log(arr18.return());

// console.log("Find Reducer: Not Found");
// const arr19 = new FindReducer(arr, (v, k) => v === 19);
// console.log(arr19.return());

// console.log("Find Index Reducer: Found");
// const arr20 = new FindIndexReducer(arr, (v, k) => v === 5);
// console.log(arr20.return(), src.findIndex((v, k) => v === 5));

// console.log("Find Index Reducer: Not Found");
// const arr21 = new FindIndexReducer(arr, (v, k) => v === 19);
// console.log(arr21.return(), src.findIndex((v, k) => v === 19));

// console.log("Some Reducer: Found");
// const arr22 = new SomeReducer(arr, (v, k) => v === 5);
// console.log(arr22.return());

// console.log("Some Reducer: Not Found");
// const arr23 = new SomeReducer(arr, (v, k) => v === 19);
// console.log(arr23.return());

// console.log("Every Reducer: True");
// const arr24 = new EveryReducer(arr, (v, k) => Number.isFinite(v));
// console.log(arr24.return());

// console.log("Every Reducer: False");
// const arr25 = new EveryReducer(arr, (v, k) => v === 5);
// console.log(arr25.return());

// console.log("IndexOf Index Reducer: Found");
// const arr26 = new IndexOfReducer(arr, 5);
// console.log(arr26.return(), src.indexOf(5));

// console.log("IndexOf Reducer: Not Found");
// const arr27 = new IndexOfReducer(arr, 19);
// console.log(arr27.return(), src.indexOf(19));

// console.log("Includes Reducer: Found");
// const arr28 = new IncludesReducer(arr, 5);
// console.log(arr28.return());

// console.log("Includes Reducer: Not Found");
// const arr29 = new IncludesReducer(arr, 19);
// console.log(arr29.return());

// console.log("Join Reducer");
// const arr30 = new JoinReducer(arr, '-');
// console.log(arr30.return());

// console.log("ToString Reducer");
// const arr31 = new ToStringReducer(arr);
// console.log(arr31.return());

// console.log("ToLocaleString Reducer");
// const arr32 = new ToLocaleStringReducer(arr);
// console.log(arr32.return());
