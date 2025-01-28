/*
 * Copyright Valmet Automation Inc.
 *
 * A pair of lookup tables that were taking up 80+ MiBs. A generated test set
 * consumed 350+ MiBs.
 */

import type {
  DisplayName,
  DisplayTitle,
  LoopName,
  WrappedProperty,
} from "./types.ts";

type DisplayLookupTable = Map<DisplayName, DisplayData>;

// 48 bytes per object
interface DisplayData {
  name: DisplayName;
  title: DisplayTitle;
  components: DisplayComponent[];
  width: number | "auto";
  height: number | "auto";
}

// 20 or 24 bytes per object
interface DisplayComponent {
  name: string;
  loopName: LoopName;
  linkedDisplayName?: DisplayName;
}

type LoopLookupTable = Map<LoopName, LoopData>;

// 104 bytes per object
interface LoopData {
  name: LoopName;
  componentTypes: string[];
  faceplateTypes: string[];
  components: LoopComponent[];
  faceplates: LoopComponent[];
  source: Source;
  metadata: null | LoopMetadataObject;
}

// 44 bytes per object
interface LoopComponent {
  faceplate: null | string;
  type: string;
  displayNames: DisplayName[];
  configuration: ComponentConfiguration;
}

// 66+ bytes per object
interface ComponentConfiguration {
  // @ts-expect-error Not possible to express this in TypeScript.
  kind: "component";
  // @ts-expect-error Not possible to express this in TypeScript.
  type: string;
  loopName: WrappedProperty<LoopName>;
  loopAdapter: WrappedProperty<string>;
  [componentConfigurationProperty: string]: WrappedProperty<unknown>;
}

const enum Source {
  A,
  B,
  C,
}

// 28 bytes per object
interface LoopMetadataObject {
  loopName: LoopName;
  loopType: string;
  description: string;
  processArea: string;
  [loopMetadataProperty: string]: unknown;
}
