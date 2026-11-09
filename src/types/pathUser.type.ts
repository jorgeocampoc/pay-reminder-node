import { PATH_USER } from "../constants/index.js";

type PathUser = (typeof PATH_USER)[keyof typeof PATH_USER];
export type { PathUser };
