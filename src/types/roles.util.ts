import { ROLES } from "../constants/index.js";

type Roles = (typeof ROLES)[keyof typeof ROLES];
export type { Roles };
