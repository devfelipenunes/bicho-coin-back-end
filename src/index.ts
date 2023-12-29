import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import {
  getBalanceOf,
  mintAndTransfer,
  transfer,
  transferFrom,
} from "./Web3Provider";

const app = express();

app.use(helmet());

app.use(morgan("tiny"));

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
  })
);

// const nextMint = new Map<string, number>();

app.post(
  "/mint/:wallet",
  async (req: Request, res: Response, next: NextFunction) => {
    const wallet = req.params.wallet;

    try {
      const tx = await mintAndTransfer(wallet);
      res.json(tx);
    } catch (err: any) {
      console.error(err);
      res.status(500).json(err.message);
    }
  }
);
app.post("/balance/:wallet", async (req: Request, res: Response) => {
  const wallet = req.params.wallet;

  try {
    const balance = await getBalanceOf(wallet);
    res.json(balance);
  } catch (err: any) {
    console.error(err);
    res.status(500).json(err.message);
  }
});

app.post("/transfer/:value", async (req: Request, res: Response) => {
  const value = req.params.value;

  try {
    const tx = await transfer(value);
    res.json(tx);
  } catch (err: any) {
    console.error(err);
    res.status(500).json(err.message);
  }
});

app.post("/transferFrom/:from/:value", async (req: Request, res: Response) => {
  const value = req.params.value;
  const from = req.params.from;

  try {
    const tx = await transferFrom(from, value);
    res.json(tx);
  } catch (err: any) {
    console.error(err);
    res.status(500).json(err.message);
  }
});

const PORT: number = parseInt(`${process.env.PORT || 3001}`);
app.listen(PORT, () => console.log("Server is listening at " + PORT));
