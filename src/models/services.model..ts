import { DataTypes, sequelize } from "../config/index.js";
import { baseAttributes, optionsModel } from "./attributes.js";

const Service = sequelize.define(
  "Service",
  {
    ...baseAttributes,
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      set(value: string) {
        this.setDataValue("name", value.trim().toLowerCase());
      },
      validate: {
        len: [3, 50],
      },
    },
    description: {
      type: DataTypes.STRING(100),
      allowNull: true,
      validate: {
        validDescription(value: string | null) {
          if (value === null || value === "") return;
          if (value.length < 6 || value.length > 100) {
            throw new Error("Description must be between 6 and 100 characters");
          }
        },
      },
    },
  },
  {
    ...optionsModel,
    tableName: "services",
    indexes: [
      {
        unique: true,
        fields: ["name", "category_id"],
        name: "unique_service_name_category",
      },
    ],
  },
);

export default Service;
