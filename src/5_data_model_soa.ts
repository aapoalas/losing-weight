/*
 * Copyright Valmet Automation Inc.
 *
 * The fundamental directed acyclic graph reimagined in a Struct-of-Arrays
 * form, expected to radically reduce memory usage. Additionally enables
 * encoding the correct post-order traversal into the data structure that is
 * used in the flow of data.
 */

import type { BRAND, NodeName } from "./types.ts";

type DataModelNodes = Map<NodeName, NodeIdentifier>;

interface DataModelNodeTable {
  // Record<NodeIdentifier, NodeType>
  kind: Uint8Array;
  // Record<NodeIdentifier, null | NodeIdentifier | Set<NodeIdentifier>>
  out: (null | NodeIdentifier | Set<NodeIdentifier>)[];
  // Record<NodeIdentifier, NodeDataByNodeType<NodeType>>
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
  // Record<SubscriptionIdentifier, NodeIdentifier>
  firstInNode: Uint32Array;
  secondInNode: Map<SubscriptionIdentifier, NodeIdentifier>;
  // Record<SubscriptionIdentifier, null | string>
  subscriptionAddressWithParams: (null | string)[];
  // Record<SubscriptionIdentifier, undefined | string>
  type: (undefined | string)[];
  optional: Set<SubscriptionIdentifier>;
  includeType: Set<SubscriptionIdentifier>;
  maxTime: Map<SubscriptionIdentifier, number>;
  minTime: Map<SubscriptionIdentifier, number>;
  unique: Map<SubscriptionIdentifier, number>;
}

interface ReadDataTable {
  // Record<ReadIdentifier, NodeIdentifier>
  firstInNode: Uint32Array;
  secondInNode: Map<SubscriptionIdentifier, NodeIdentifier>;
  // Record<ReadIdentifier, null | string>
  subscriptionAddressWithParams: (null | string)[];
  // Record<ReadIdentifier, undefined | string>
  type: (undefined | string)[];
  optional: Set<SubscriptionIdentifier>;
  includeType: Set<SubscriptionIdentifier>;
}

interface FunctionDataTable {
  // Record<FunctionIdentifier, NodeIdentifier[]>
  in: NodeIdentifier[][];
  // Record<FunctionIdentifier, string>
  function: string[];
}

type NodeDataByType<Type extends NodeType> = Type extends NodeType.Const
  ? null
  : Type extends NodeType.Ref
    ? NodeIdentifier
    : Type extends NodeType.Subscription
      ? SubscriptionIdentifier
      : Type extends NodeType.Read
        ? ReadIdentifier
        : Type extends NodeType.Function
          ? FunctionIdentifier
          : never;

// === LOCAL-ONLY IDENTIFIER DEFINITIONS ===

type NodeIdentifier = number & { [BRAND]: "NodeIdentifier" };

type SubscriptionIdentifier = number & { [BRAND]: "subscription" };

type FunctionIdentifier = number & { [BRAND]: "function" };

type ReadIdentifier = number & { [BRAND]: "read" };
