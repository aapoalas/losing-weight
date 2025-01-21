interface SubscriptionData {
  loopAddress: string;
  maxTime: number;
  minTime: number;
  optional: boolean;
  read: boolean;
  unique: number;
  y: boolean;
}

declare const marker: unique symbol;
type NodeId = string & { [marker]: "NodeId" };

type DataModelNodes = Map<NodeId, DataModelNode>;

type DataModelNode = ConstNode | RefNode | SubscriptionNode | FunctionNode;

interface ConstNode {
  kind: "const";
  in: null;
  out: null | Set<NodeId>;
  data: null;
}

interface RefNode {
  kind: "const";
  in: [NodeId];
  out: null | Set<NodeId>;
  data: null;
}

interface SubscriptionNode {
  kind: "subscription";
  in: [NodeId] | [NodeId, NodeId];
  out: null | Set<NodeId>;
  data: SubscriptionData;
}

interface FunctionNode {
  kind: "function";
  in: null | NodeId[];
  out: null | Set<NodeId>;
  data: string;
}

interface DataObjectBool {
  /**
   * If `true`, the data should be used.
   */
  a: boolean[];
  b: unknown[];
  c: unknown[];
  d: unknown[];
  e: unknown[];
  f: unknown[];
}

// Size: N references
// Entropy: <= N * 1 bit
export function storeConditional({
  a: a_arr,
  b: b_arr,
  c: c_arr,
  d: d_arr,
  e: e_arr,
  f: f_arr,
}: DataObjectBool) {
  const length = a_arr.length;
  for (let i = 0; i < length; i++) {
    const a = a_arr[i];
    if (!a) {
      console.log("Currently unused:", b_arr[i]);
      continue;
    } else {
      const b = b_arr[i],
        c = c_arr[i],
        d = d_arr[i],
        e = e_arr[i],
        f = f_arr[i];
      console.log(b, c, d, e, f);
    }
  }
}

interface DataObjectBoolless {
  b: unknown[];
  c: unknown[];
  d: unknown[];
  e: unknown[];
  f: unknown[];
}

// Size: (((1 + 6) * 2~3 + 5) references
export function storeSegmented(
  used: DataObjectBoolless,
  unused: DataObjectBoolless,
) {
  {
    // Used
    const {
      b: b_used_arr,
      c: c_used_arr,
      d: d_used_arr,
      e: e_used_arr,
      f: f_used_arr,
    } = used;
    const used_length = b_used_arr.length;
    for (let i = 0; i < used_length; i++) {
      const b = b_used_arr[i],
        c = c_used_arr[i],
        d = d_used_arr[i],
        e = e_used_arr[i],
        f = f_used_arr[i];
      console.log(b, c, d, e, f);
    }
  }
  {
    // Unused
    const { b: b_unused_arr } = unused;
    const unused_length = b_unused_arr.length;
    for (let i = 0; i < unused_length; i++) {
      console.log("Currently unused:", b_unused_arr[i]);
    }
  }
}

interface DataObjectRareBool {
  /**
   * If index is in set, the data should be used.
   */
  a: Set<number>;
  b: unknown[];
  c: unknown[];
  d: unknown[];
  e: unknown[];
  f: unknown[];
}

// Size: ~4 + N * probability * overallocation references
export function storeRareConditional({
  a: a_set,
  b: b_arr,
  c: c_arr,
  d: d_arr,
  e: e_arr,
  f: f_arr,
}: DataObjectRareBool) {
  const length = b_arr.length;
  for (let i = 0; i < length; i++) {
    const a = a_set.has(i);
    if (!a) {
      console.log("Currently unused:", b_arr[i]);
      continue;
    } else {
      const b = b_arr[i],
        c = c_arr[i],
        d = d_arr[i],
        e = e_arr[i],
        f = f_arr[i];
      console.log(b, c, d, e, f);
    }
  }
}
