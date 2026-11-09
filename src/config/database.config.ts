import { Sequelize, DataTypes, QueryTypes } from "sequelize";
import { tryConnection } from "../utils/index.js";
import { SERVICE_TYPE } from "../constants/index.js";
import { env } from "./env.config.js";

const sequelize = new Sequelize(
  env.URL_DATABASE,
);

const dbConnection = async () => {
  try {
    await tryConnection(
      () => sequelize.authenticate(),
      10,
      2000,
      SERVICE_TYPE.database,
    );
    await sequelize.sync({ force: false });
    console.log("DB on");
  } catch (error) {
    console.log(error);
  }
};

export { dbConnection, sequelize,DataTypes,QueryTypes };
