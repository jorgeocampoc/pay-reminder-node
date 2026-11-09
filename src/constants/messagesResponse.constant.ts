const SUCCESS_MESSAGE = {
  created: "Created successfully",
  updated: "Updated successfully",
  deleted: "Deleted successfully",
  read: "Retrieved successfully",
} as const;

const ERROR_MESSAGE = {
  tryConnection: "Connecting to the service...",
  notFound: "Resource not found",
  alreadyExists: "Resource already exists",
  invalidData: "Invalid data",
  unauthorized: "Unauthorized",
  forbidden: "Forbidden",
  internalServer: "Internal server error",
} as const;

const AUTH_MESSAGE = {
  successfully: "Authentication successful",
  isAuthenticated: "Already authenticated",
  USER_NOT_FOUND: "User not founded",
  NOT_ACTIVED: "User account is not active",
  CREDENTIALS: "Crendetials not valid",
};

export { ERROR_MESSAGE, SUCCESS_MESSAGE,AUTH_MESSAGE };
