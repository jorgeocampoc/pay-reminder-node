import express, { type Express } from "express";
import { dbConnection, env } from "../config/index.js";
import "./index.js";
class Server {
  private app: Express;
  private port: number;
  constructor() {
    this.port = env.PORT;
    this.app = express();
  }
  listen() {
    dbConnection();
    this.app.listen(this.port, () =>
      console.log(`Server in the port ${this.port}`),
    );
  }
}

export default Server;
