import { STATUS_PAYENT } from "../constants/index.js";

type StatusPayment = (typeof STATUS_PAYENT)[keyof typeof STATUS_PAYENT];
export type { StatusPayment };
