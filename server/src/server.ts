import express from "express";
import "express-async-errors";

import cors from "cors";
import path from "path";
import routes from "./routes";
import { AppDataSource } from "./database/data-source";
import errorHandler from "./errrors/handler";

AppDataSource.initialize()
  .then(() => {
    const app = express();

    app.use(cors());
    app.use(express.json());
    app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));
    app.use(routes);
    app.use(errorHandler);
    app.listen(process.env.API_PORT || 3333);

    app.get("/", (req, res) => {
      return res.json({ message: "Tudo certo" });
    });
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });
