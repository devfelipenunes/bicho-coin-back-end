import express, { Request, Response, NextFunction } from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";

import playerRouter from "./routers/PlayerRouter";

const app = express();

app.use(morgan("tiny"));
app.use(helmet());

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.use("/player", playerRouter);

export default app;
