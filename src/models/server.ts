import express, { type Express } from "express";
import cors from "cors";
import { corsOptions, dbConnection, env } from "../config/index.js";
import "./index.js";
import {
  userRoutes,
  authRoutes,
  paymentRoutes,
  categoryRoutes,
  paymentServiceRoutes,
} from "../routes/index.js";
import { errorHandler } from "../errors/index.js";
import cookieParser from "cookie-parser";
import initJobs from "../jobs/index.js";
class Server {
  private app: Express;
  private port: number;
  private authRoutes: string;
  private userRoutes: string;
  private categoryRoutes: string;
  private paymentServiceRoutes: string;
  private paymentRoutes: string;
  constructor() {
    this.port = env.PORT;
    this.app = express();
    this.authRoutes = "/auth";
    this.userRoutes = "/users";
    this.categoryRoutes = "/categories";
    this.paymentServiceRoutes = "/payment-services";
    this.paymentRoutes = "/payments";
    this.middlewares();
    this.routes();
  }
  middlewares() {
    this.app.use(cors(corsOptions));
    this.app.use(express.json());
    this.app.use(cookieParser());
  }
  routes() {
    this.app.use(this.authRoutes, authRoutes);
    this.app.use(this.userRoutes, userRoutes);
    this.app.use(this.categoryRoutes, categoryRoutes);
    this.app.use(this.paymentServiceRoutes, paymentServiceRoutes);
    this.app.use(this.paymentRoutes, paymentRoutes);
    this.app.use(errorHandler);
  }
  listen() {
    dbConnection();
    initJobs()
    this.app.listen(this.port, () =>
      console.log(`Server in the port ${this.port}`),
    );
  }
}

export default Server;
