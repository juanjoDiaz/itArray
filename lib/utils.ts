export const safeToString = (v: any) => {
  if (v === undefined || v === null) return '';
  return (typeof v.toString === 'function')
    ? v.toString()
    : `${v}`;
};

export const safeToLocaleString = (v: any) => (typeof v.toLocaleString === 'function')
  ? v.toLocaleString()
  : safeToString(v)