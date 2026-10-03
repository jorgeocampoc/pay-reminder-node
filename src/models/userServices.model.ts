import { DataTypes, sequelize } from "../config/index.js";
import {
  FREQUENCY_MONTHS,
} from "../constants/index.js";
import { baseAttributes, optionsModel } from "./attributes.js";

const UserService = sequelize.define(
  "UserService",
  {
    ...baseAttributes,
    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    frecuency: {
      type: DataTypes.ENUM(...Object.values(FREQUENCY_MONTHS)),
      allowNull: false,
      defaultValue: FREQUENCY_MONTHS.monthly,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
      },
    },
    
  },
  {
    ...optionsModel,
    tableName: "user_services",
  },
);

export default UserService;
