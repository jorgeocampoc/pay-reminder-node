import { PATH_USER, ROLES } from "../constants/index.js";
import type { Roles } from "../types/index.js";

const getPathUser = (role: Roles) => {
  switch (role) {
    case ROLES.admin:
      return PATH_USER.admin;
    case ROLES.customer:
      return PATH_USER.customer;

    default:
      break;
  }
};

export { getPathUser };
