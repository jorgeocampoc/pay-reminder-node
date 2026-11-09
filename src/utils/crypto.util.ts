import bcrypt from "bcrypt";
const verifyPassword = (pass: string, passHash: string): boolean => {
  return bcrypt.compareSync(pass, passHash);
};

export { verifyPassword };
