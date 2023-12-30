import { Request, Response, NextFunction } from "express";
import playerRepository from "../repositories/playerRepository";

export async function getBalanceOf(req: Request, res: Response) {
  const wallet = req.params.wallet;
  const balance = await playerRepository.getBalanceOf(wallet);
  return res.json(balance);
}

async function postMintTransfer(req: Request, res: Response) {
  const wallet = req.params.wallet;
  const tx = await playerRepository.mintAndTransfer(wallet);
  return res.json(tx);
}

export default {
  getBalanceOf,
  postMintTransfer,
};
