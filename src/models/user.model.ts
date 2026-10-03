import { sequelize,DataTypes } from "../config/index.js";
import { baseAttributes, optionsModel } from "./attributes.js";
import { DEFAULT_IMAGE_USER, NAME_REGEX, ROLES } from "../constants/index.js";

const User = sequelize.define(
  "User",
  {
    ...baseAttributes,
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: NAME_REGEX,
      },
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: NAME_REGEX,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url_img: {
      type: DataTypes.TEXT,
      defaultValue: DEFAULT_IMAGE_USER,
      allowNull: false,
      validate: {
        isUrl: true,
      },
    },
    role: {
      type: DataTypes.ENUM(...Object.values(ROLES)),
      allowNull: false,
      defaultValue: ROLES.customer,
    },
    is_Active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    email_verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    last_login_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW(),
    },
  },
  {
    ...optionsModel,
    tableName: "users",
  },
);
export default User;
