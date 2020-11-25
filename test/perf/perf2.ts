import TransArray from "../../lib/TransArray";

const res = new TransArray([6,7,8,9])
  .optimizedmap((v, k) => ({ k, v }))
  .optimizedfilter(v => v.v % 2 === 0)
  .optimizedmap(x => x.v)
  .optimizedfilter(v => v < 7)
  .optimizedmap(v => `${v}`)
  .toArray();

console.log(res);