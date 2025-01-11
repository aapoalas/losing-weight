interface DataObjectAoS {
  a: unknown;
  b: unknown;
  c: unknown;
  d: unknown;
  e: unknown;
  f: unknown;
}

// Size: 1 array + N objects * 6 properties
// - ((1 + N) * 2~3 + N * 6) references
export function storeAoS(data: DataObjectAoS[]) {
  data.forEach(({ a, b, c, d, e, f }) => {
    console.log(a, b, c, d, e, f);
  });
}

interface DataObjectSoA {
  a: unknown[];
  b: unknown[];
  c: unknown[];
  d: unknown[];
  e: unknown[];
  f: unknown[];
}

// Size: 1 object + 6 arrays * N properties
// - ((1 + 6) * 2~3 + 6 + N * 6) references
export function storeSoA({
  a: a_arr,
  b: b_arr,
  c: c_arr,
  d: d_arr,
  e: e_arr,
  f: f_arr,
}: DataObjectSoA) {
  const length = a_arr.length;
  for (let i = 0; i < length; i++) {
    const a = a_arr[i],
      b = b_arr[i],
      c = c_arr[i],
      d = d_arr[i],
      e = e_arr[i],
      f = f_arr[i];
    console.log(a, b, c, d, e, f);
  }
}
