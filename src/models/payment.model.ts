import { DataTypes, sequelize } from "../config/index.js";
import { STATUS_PAYENT } from "../constants/index.js";

import { baseAttributes, optionsModel } from "./attributes.js";
const Payment = sequelize.define(
  "Payment",
  {
    ...baseAttributes,
    amount: {
      type: DataTypes.DECIMAL,
      defaultValue: 0,
      validate: {
        min: 0,
      },
    },
    status: {
      type: DataTypes.ENUM(...Object.values(STATUS_PAYENT)),
      defaultValue: STATUS_PAYENT.pending,
    },
    payment_date: {
      type: DataTypes.DATE,
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    ...optionsModel,
    tableName: "payments",
  },
);

export default Payment;
