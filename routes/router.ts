import { Router } from "express";
import cardsRouter from "./cardsRouter";
import paymentsRouter from "./paymentsRouter";
import rechargesRouter from "./rechargesRouter";

const router = Router();

router.use(cardsRouter, paymentsRouter, rechargesRouter);

export default router;