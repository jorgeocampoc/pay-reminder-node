import { DataTypes, sequelize } from "../config/index.js";
import {
  NOT_SPACES,
} from "../constants/index.js";
import { baseAttributes, optionsModel } from "./attributes.js";

const Category = sequelize.define(
  "Category",
  {
    ...baseAttributes,
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: NOT_SPACES,
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
    tableName: "categories",
  },
);

export default Category;
