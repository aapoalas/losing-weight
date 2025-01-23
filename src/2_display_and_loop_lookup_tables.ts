/*
 * Copyright Valmet Automation Inc.
 *
 * A pair of lookup tables that were taking up 80+ MBs. A generated test set
 * consumed 350+ MBs.
 */

import type {
  DisplayName,
  DisplayTitle,
  LoopName,
  WrappedProperty,
} from "./types.ts";

type DisplayLookupTable = Map<DisplayName, DisplayData>;

interface DisplayData {
  name: DisplayName;
  title: DisplayTitle;
  components?: DisplayComponent[];
  width: number | "auto";
  height: number | "auto";
}

interface DisplayComponent {
  name: string;
  loopName: LoopName;
  linkedDisplayName?: DisplayName;
}

type LoopLookupTable = Map<LoopName, LoopData>;

interface LoopData {
  name: LoopName;
  componentTypes: string[];
  faceplateTypes: string[];
  components: LoopComponent[];
  faceplates: LoopComponent[];
  source: Source;
  metadata: null | LoopMetadataObject;
}

interface LoopComponent {
  faceplate: null | string;
  type: string;
  displayNames: DisplayName[];
  configuration: ComponentConfiguration;
}

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

interface LoopMetadataObject {
  loopName: LoopName;
  loopType: string;
  description: string;
  processArea: string;
  [loopMetadataProperty: string]: unknown;
}
