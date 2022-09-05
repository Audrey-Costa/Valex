import { Router } from "express";
import { recharge } from "../controllers/rechargeController";
import schemaValidation from "../middlewares/schemaValidationMiddleware";
import rechargesSchema from "../schemas/rechargesSchemas";

const rechargesRouter = Router();

rechargesRouter.post("/recharges/:id", schemaValidation(rechargesSchema), recharge);

export default rechargesRouter;