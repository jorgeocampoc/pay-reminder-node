import { env } from "./env.config.js";

const corsOptions = {
  origin: env.ORIGIN_ALLOWED,
  credentials:true
};
export { corsOptions };
