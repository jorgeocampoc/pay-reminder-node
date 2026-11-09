import { col, literal, type Transaction } from "sequelize";
import { Category, Services, UserService } from "../models/index.js";
import type { UserServiceRegisterSchema } from "../types/userService.type.js";
import Service from "../models/services.model..js";

const createUserService = async (
  userService: UserServiceRegisterSchema,
  transaction: Transaction,
) => {
  return (await UserService.create(userService, { transaction })).dataValues;
};
const getAllUserServices = async (user_id: string) => {
  return await UserService.findAll({
    where: { user_id },
    attributes: [
      "id",
      "due_date",
      "frequency",
      "amount",
      [col("Service.Category.icon"), "icon"],
      [col("Service.description"), "description"],
      [col("Service.name"), "name"],
      [
        literal(
          `(select count(*)::INTEGER from payments as p where p.user_service_id = "UserService".id and p.status='pending')`,
        ),
        "peding_payments",
      ],
    ],
    include: [
      {
        model: Service,
        attributes: [],
        include: [
          {
            model: Category,
            attributes: [],
          },
        ],
      },
    ],
  });
};

export { createUserService, getAllUserServices };
