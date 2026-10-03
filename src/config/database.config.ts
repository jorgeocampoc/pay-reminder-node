import { Sequelize, DataTypes } from "sequelize";
import { tryConnection } from "../utils/index.js";
import { SERVICE_TYPE } from "../constants/index.js";

// Option 1: Passing a connection URI
const sequelize = new Sequelize(
  "postgres://postgres:12345@localhost:5432/pay_reminder",
);

const dbConnection = async () => {
  try {
    await tryConnection(
      () => sequelize.authenticate(),
      10,
      2000,
      SERVICE_TYPE.database,
    );
    await sequelize.sync({ force: true });
    console.log("DB on");
  } catch (error) {
    console.log(error);
  }
};

export { dbConnection, sequelize,DataTypes };
