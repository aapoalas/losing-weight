/**
 * Copyright Valmet Automation Inc.
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
