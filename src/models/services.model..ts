import { DataTypes, sequelize } from "../config/index.js";
import {
  NAME_REGEX,
  NOT_SPACES,
} from "../constants/index.js";
import { baseAttributes, optionsModel } from "./attributes.js";

const Service = sequelize.define(
  "Service",
  {
    ...baseAttributes,
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: NAME_REGEX,
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        is: NOT_SPACES,
      },
    },
   
  },
  {
    ...optionsModel,
    tableName: "services",
  },
);

export default Service;
