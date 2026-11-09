import { RESOURCE_SOURCE } from "../constants/index.js";

type ResourceSource = (typeof RESOURCE_SOURCE)[keyof typeof RESOURCE_SOURCE];
export type { ResourceSource };
