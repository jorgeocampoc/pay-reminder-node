import { SERVICE_TYPE } from "../constants/index.js";

type ServiceType = (typeof SERVICE_TYPE)[keyof typeof SERVICE_TYPE];

export type { ServiceType };
