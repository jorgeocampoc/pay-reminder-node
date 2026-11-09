import { ERROR_MESSAGE } from "../constants/index.js";
import type { ServiceType } from "../types/index.js";

const tryConnection = async <T>(
  fn: () => Promise<T>,
  retries: number = 5,
  delay: number = 5000,
  service: ServiceType,
): Promise<T> => {
  for (let attemp = 0; attemp < retries; attemp++) {
    try {
      return await fn();
    } catch (error) {
      if (attemp === retries) throw error;
      await new Promise((resolve) => setTimeout(resolve, delay));
          console.log(ERROR_MESSAGE.tryConnection+' [database]');

      
    }
  }
  throw new Error(`${service} failed`);
};

export { tryConnection };
