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
      console.log('otra ves');
      
    }
  }
  throw new Error(`${service} failed`);
};

export { tryConnection };
