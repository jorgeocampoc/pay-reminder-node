import { DataTypes, sequelize } from "../config/index.js";
import { NOT_SPACES } from "../constants/index.js";
import { baseAttributes, optionsModel } from "./attributes.js";

const Category = sequelize.define(
  "Category",
  {
    ...baseAttributes,
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      set(value: string) {
        this.setDataValue("name", value.trim().toLowerCase());
      },
      validate: {
        min: 6,
      },
    },
    icon: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false,
      set(value: string) {
        this.setDataValue("icon", value.trim().toLowerCase());
      },
      validate: {
        min: 3,
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      set(value: string) {
        this.setDataValue("description", value.trim().toLowerCase());
      },
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
