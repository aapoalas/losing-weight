/*
 * Copyright Valmet Automation Inc.
 */

export interface WrappedProperty<T> {
  value: T;
  type?: string;
  [attributes: string]: unknown;
}

export type FlexibleIndexArray = Uint8Array | Uint16Array | Uint32Array;

export type DisplayTitle = string & { [BRAND]: "display.title" };

export type DisplayName = string & { [BRAND]: "display.name" };

export type LoopName = string & { [BRAND]: "loop.name" };

export type NodeId = string & { [BRAND]: "NodeId" };

export declare const BRAND: unique symbol;
