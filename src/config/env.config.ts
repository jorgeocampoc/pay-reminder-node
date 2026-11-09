const getEnv = (key: string) => {
  const value = process.env[key];
  if (!value) throw new Error(`The env ${key} not found`);
  return value;
};

const env = {
  PORT: parseInt(getEnv("PORT")),
  ORIGIN_ALLOWED: getEnv("ORIGIN_ALLOWED"),
  SUPABASE_URL: getEnv("SUPABASE_URL"),
  ACCESS_TOKEN_SECRET: getEnv("ACCESS_TOKEN_SECRET"),
  NODE_ENV: getEnv("NODE_ENV"),
  API_KEY_RESEND: getEnv("API_KEY_RESEND"),
  SUPABASE_SECRET_KEY: getEnv("SUPABASE_SECRET_KEY"),
  URL_DATABASE: `postgres://${getEnv("DB_USER")}:${getEnv("DB_PASS")}@${getEnv("DB_SERVER")}:5432/${getEnv("DB_NAME")}`,
};

export { env };
