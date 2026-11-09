import cron from "node-cron";
import { asyncUserPayments } from "./payments.js";

const initJobs =  () => {
  cron.schedule("* 10 0 * * *", async() => {
    await asyncUserPayments()
  });
};

export default initJobs;
