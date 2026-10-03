const getEnv = (key: string) => {
  const value = process.env[key];
  if (!value) throw new Error(`The env ${key} not found`);
  return value;
};

const env = {
  PORT: parseInt(getEnv("PORT")),
};

export { env };
