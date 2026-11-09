import { MODELS } from "../constants/index.js";

type Models = (typeof MODELS)[keyof typeof MODELS];
export type { Models };
