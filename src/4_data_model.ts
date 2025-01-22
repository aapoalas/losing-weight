/**
 * Copyright Valmet Automation Inc.
 */

import type { NodeId } from "./types.ts";

type DataModelNodes = Map<NodeId, DataModelNode>;

type DataModelNode = ConstNode | RefNode | SubscriptionNode | FunctionNode;

interface GenericDataModelNode {
  kind: string;
  in: NodeId[];
  out: Set<NodeId>;
  data: unknown;
}

interface ConstNode {
  kind: "const";
  in: [];
  out: Set<NodeId>;
  data: null;
}

interface RefNode {
  kind: "const";
  in: [NodeId];
  out: Set<NodeId>;
  data: null;
}

interface SubscriptionNode {
  kind: "subscription";
  in: [NodeId] | [NodeId, NodeId];
  out: Set<NodeId>;
  data: SubscriptionData;
}

interface FunctionNode {
  kind: "function";
  in: NodeId[];
  out: Set<NodeId>;
  data: string;
}

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
