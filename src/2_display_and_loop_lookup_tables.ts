/**
 * Copyright Valmet Automation Inc.
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
  configuration: ComponentConfiguration;
  displayNames: DisplayName[];
  type: string;
  faceplate: null | string;
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
