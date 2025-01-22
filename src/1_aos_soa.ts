import type { FlexibleIndexArray, BRAND } from "./types.ts";

interface Component {
  type: string;
  enabled: boolean;
  hovered: boolean;
  selected: boolean;
  isRoot: boolean;
  width: number | string;
  height: number | string;
  parent: null | Component;
  children: Component[];
  /**
   * Unique name of the component within its container.
   */
  name: string;
  /**
   * Two-part identifier for this DataObject, first part is a hierarchical path
   * to the container and the second part is a unique name within the container.
   */
  scopedName: `${string}/${string}`;
}

interface Components {
  enabled: ComponentDataStorage;
  disabled: ComponentDataStorage;
}

interface ComponentDataStorage {
  /**
   * Refers to {@linkcode ComponentDataParts} types array.
   */
  type: FlexibleIndexArray;
  hovered: null | ComponentIndex;
  /**
   * Each currently selected component's {@linkcode ComponentIndex} is present
   * in the Set.
   */
  selected: Set<ComponentIndex>;
  /**
   * Refers back to {@linkcode ComponentDataStorage}. Maximum number is used as
   * a sentinel for `null`.
   */
  parent: FlexibleIndexArray;
  children: Map<ComponentIndex, ComponentIndex[]>;
  /**
   * If value is maximum value, then {@linkcode fullWidth} Map contains the
   * real value.
   */
  width: Uint16Array;
  /**
   * If value is maximum value, then {@linkcode fullWidth} Map contains the
   * real value.
   */
  height: Uint16Array;
  fullWidth: Map<ComponentIndex, number | string>;
  fullHeight: Map<ComponentIndex, number | string>;
  /**
   * Refers to {@linkcode ComponentDataParts} names array. Maximum number is
   * used as a sentinel for `null`.
   */
  name: FlexibleIndexArray;
  /**
   * Refers to {@linkcode ComponentDataParts} scopes array. Maximum number is
   * used as a sentinel for `null`.
   */
  scope: FlexibleIndexArray;
}

interface ComponentDataParts {
  types: string[];
  names: string[];
  scopes: string[];
}

/**
 * References an index in {@linkcode ComponentDataStorage}.
 */
type ComponentIndex = number & { [BRAND]: unknown };
