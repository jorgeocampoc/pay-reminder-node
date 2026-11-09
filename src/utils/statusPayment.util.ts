import type { StatusPayment } from "../types/index.js";

const isStatusPayment = (status: string): status is StatusPayment => {
  return status === "pending" || status === "paid" || status === "overdue";
};

export { isStatusPayment };
