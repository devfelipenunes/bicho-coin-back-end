import { Router } from "express";

import playerController from "../controllers/playerController";

const router = Router();

router.post("/balance/:wallet", playerController.getBalanceOf);
router.post("/mint/:wallet", playerController.postMintTransfer);

export default router;
