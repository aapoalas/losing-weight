/*
 * Copyright Valmet Automation Inc.
 *
 * A fundamental directed acyclic graph underpinning the flow of data from the
 * automation system to the user interface. Found to often take ~10 MB a pop.
 */

import type { NodeName } from "./types.ts";

type DataModelNodes = Map<NodeName, DataModelNode>;

type DataModelNode = ConstNode | RefNode | SubscriptionNode | FunctionNode;

// 60 bytes per object
interface GenericDataModelNode {
  kind: string;
  in: NodeName[];
  out: Set<NodeName>;
  data: unknown;
}

interface ConstNode {
  kind: "const";
  in: [];
  out: Set<NodeName>; // Note: Set is never empty.
  data: null;
}

interface RefNode {
  kind: "const";
  in: [NodeName];
  out: Set<NodeName>;
  data: null;
}

interface SubscriptionNode {
  kind: "subscription";
  in: [NodeName] | [NodeName, NodeName];
  out: Set<NodeName>;
  data: SubscriptionData;
}

interface FunctionNode {
  kind: "function";
  in: NodeName[];
  out: Set<NodeName>;
  data: string;
}

// 40 bytes per object
interface SubscriptionData {
  subscriptionAddressWithParams: null | string;
  type: undefined | string;
  options: null | {
    maxTime?: number;
    minTime?: number;
  };
  optional: boolean;
  read: boolean;
  includeType: boolean;
  unique: false | number;
}
