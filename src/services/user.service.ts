import { ERROR_MESSAGE } from "../constants/index.js";
import { AppError } from "../errors/index.js";
import { User } from "../models/index.js";
import type { UserRegister } from "../types/index.js";

const createUser = async (user: UserRegister) => {
  const { email } = user;
  const findUserByEmail = await User.findOne({
    where: {
      email,
    },
  });
  if (findUserByEmail) throw new AppError('El email is already registered', 409);
  return await User.create(user);
};

export { createUser };
