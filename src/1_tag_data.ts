type LoopLookupTable = Map<string, LoopData>;

interface LoopData {
  loopName: string;
  componentTypes: string[];
  componentObjects: ComponentObject[];
  faceplateTypes: string[];
  faceplateObjects: ComponentObject[];
  source: SourceKind;
  loopMetadata: LoopMetadataObject;
}

type SourceKind = -1 | 1 | 2;

interface ComponentObject {
  kind: "component";
  type: string;
  loopName: string;
  loopAdapter: string;
  [componentConfigurationProperty: string]: unknown;
}

interface LoopMetadataObject {
  loopName: string;
  [loopMetadataProperty: string]: unknown;
}

type DisplayLookupTable = Map<string, DisplayData>;

interface DisplayData {
  displayName: string;
  displayComponents: DisplayComponent[];
  width: number;
  height: number;
}

interface DisplayComponent {
  componentName: string;
  loopName: string;
  linkedDisplayName?: string;
}
