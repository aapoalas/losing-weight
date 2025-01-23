/*
 * Copyright Valmet Automation Inc.
 *
 * A pair of lookup tables, smushed down to 9 MBs using Strct-of-Arrays! The
 * same generated test set took only 15 Mbs!
 */

import type {
  BRAND,
  DisplayName,
  DisplayTitle,
  FlexibleIndexArray,
  LoopName,
} from "./types.ts";

type DisplayLookupTable = Map<DisplayName, DisplayIdentifier>;

// Record<DisplayName, DisplayData>
export interface DisplayDataTable {
  // Record<DisplayIdentifier, DisplayName>
  name: DisplayName[];
  // Record<DisplayIdentifier, DisplayTitle>
  title: DisplayTitle[];
  // Record<DisplayIdentifier, number>
  componentsCount: FlexibleIndexArray;
  // Record<DisplayIdentifier, null | DisplayComponentIdentifier>
  componentsStart: FlexibleIndexArray;
  height: Map<DisplayIdentifier, number | "auto">;
  width: Map<DisplayIdentifier, number | "auto">;
}

// Record<DisplayComponentIdentifier, DisplayComponent>
export interface DisplayComponentTable {
  // Record<DisplayComponentIdentifier, DisplayComponentNameIdentifier>
  componentName: FlexibleIndexArray;
  // Record<DisplayComponentIdentifier, LoopIdentifier>
  loopName: FlexibleIndexArray;
  linkedDisplayName: Map<DisplayComponentIdentifier, DisplayIdentifier>;
}

type LoopLookupTable = Map<LoopName, LoopIdentifier>;

// Record<LoopName, LoopData>
export interface LoopDataTable {
  // Record<LoopIdentifier, LoopName>
  name: LoopName[];
  // Record<LoopIdentifier, null | LoopComponentIdentifier>
  component: FlexibleIndexArray;
  // Record<LoopIdentifier, null | LoopComponentIdentifier>
  faceplate: FlexibleIndexArray;
  // Record<LoopIdentifier, number>
  displayNamesCount: FlexibleIndexArray;
  // Record<LoopIdentifier, null | LoopDisplayNamesIdentifier>
  displayNamesStart: FlexibleIndexArray;
}

// Record<LoopComponentIdentifier, LoopComponent>
export interface LoopComponentTable {
  // Record<LoopComponentIdentifier, null | FaceplateNamePartIdentifier>
  faceplateNamePart: FlexibleIndexArray;
  // Record<LoopComponentIdentifier, null | FaceplatePathPartIdentifier>
  faceplatePathPart: FlexibleIndexArray;
  // Record<LoopComponentIdentifier, LoopComponentTypeIdentifier>
  type: FlexibleIndexArray;
  // Record<LoopComponentIdentifier, LoopComponentLoopAdapterIdentifier>
  loopAdapter: FlexibleIndexArray;
  // Record<LoopComponentIdentifier, null | LoopComponentRestOfConfigurationIdentifier>
  restOfConfiguration: FlexibleIndexArray;
}

// Record<LoopDisplayNamesIdentifier, DisplayIdentifier>
type LoopDisplayNames = FlexibleIndexArray;

interface DataStorage {
  // Record<LoopComponentTypeIdentifier, string>
  componentTypeStringArray: string[];
  // Record<DisplayComponentNameIdentifier, string>
  componentNamesStringArray: string[];
  // Record<LoopFaceplateNamePartIdentifier, string>
  faceplateNamePartStringArray: string[];
  // Record<LoopFaceplatePathPartIdentifier, string>
  faceplatePathPartStringArray: string[];
  // Record<LoopComponentLoopAdapterIdentifier, string>
  loopAdapterStringArray: string[];
  // Record<LoopComponentRestOfConfigurationIdentifier, string>
  restOfConfigurationStringifiedArray: string[];
}

// === LOCAL-ONLY IDENTIFIER DEFINITIONS ===

export type DisplayIdentifier = number & {
  [BRAND]: "display";
};
export type DisplayComponentIdentifier = number & {
  [BRAND]: "display.components[]";
};
export type DisplayComponentNameIdentifier = number & {
  [BRAND]: "display.components[].name";
};

export type LoopIdentifier = number & {
  [BRAND]: "loop";
};
export type LoopComponentIdentifier = number & {
  [BRAND]: "loop.components[0]";
}; // also "loop.faceplates[0]"
export type LoopDisplayNamesIdentifier = number & {
  [BRAND]: "loop.components[..].displayNames";
};
export type LoopFaceplateNamePartIdentifier = number & {
  [BRAND]: "loop.components[0].faceplate::name";
};
export type LoopFaceplatePathPartIdentifier = number & {
  [BRAND]: "loop.components[0].faceplate::path";
};
export type LoopComponentTypeIdentifier = string & {
  [BRAND]: "loop.components[0].configuration.type";
};
export type LoopComponentLoopAdapterIdentifier = string & {
  [BRAND]: "loop.components[0].configuration.loopAdapter";
};
export type LoopComponentRestOfConfigurationIdentifier = string & {
  [BRAND]: "loop.components[0].configuration::...";
};
