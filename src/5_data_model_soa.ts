/*
 * Copyright Valmet Automation Inc.
 *
 * The fundamental directed acyclic graph reimagined in a Struct-of-Arrays
 * form, expected to radically reduce memory usage. Additionally enables
 * encoding the correct post-order traversal into the data structure that is
 * used in the flow of data.
 */

import type { BRAND, NodeId } from "./types.ts";

type DataModelNodes = Map<NodeId, NodeIdentifier>;

interface DataModelNodeTable {
  kind: Uint8Array & NodeType[];
  out: (null | NodeIdentifier | Set<NodeIdentifier>)[];
  data: Uint32Array;
}

interface DataModelNodeDataTable {
  subscriptions: SubscriptionDataTable;
  reads: null | ReadDataTable;
  functions: FunctionDataTable;
}

const enum NodeType {
  Const,
  Ref,
  Subscription,
  Read,
  Function,
}

interface SubscriptionDataTable {
  firstInNode: Uint32Array & NodeIdentifier[];
  secondInNode: Map<SubscriptionIdentifier, NodeIdentifier>;
  subscriptionAddressWithParams: (null | string)[];
  type: (undefined | string)[];
  optional: Set<SubscriptionIdentifier>;
  includeType: Set<SubscriptionIdentifier>;
  maxTime: Map<SubscriptionIdentifier, number>;
  minTime: Map<SubscriptionIdentifier, number>;
  unique: Map<SubscriptionIdentifier, number>;
}

interface ReadDataTable {
  firstInNode: Uint32Array & NodeIdentifier[];
  secondInNode: Map<SubscriptionIdentifier, NodeIdentifier>;
  subscriptionAddressWithParams: (null | string)[];
  type: (undefined | string)[];
  optional: Set<SubscriptionIdentifier>;
  includeType: Set<SubscriptionIdentifier>;
}

interface FunctionDataTable {
  in: NodeIdentifier[][];
  function: string;
}

type SubscriptionIdentifier = number & { [BRAND]: "subscription" };
type ReadIdentifier = number & { [BRAND]: "read" };
type NodeIdentifier = number & { [BRAND]: "NodeIdentifier" };
