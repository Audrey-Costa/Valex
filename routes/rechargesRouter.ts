import { Router } from "express";
import schemaValidation from "../middlewares/schemaValidationMiddleware";
import rechargesSchema from "../schemas/rechargesSchemas";

const rechargesRouter = Router();

rechargesRouter.post("/recharges", schemaValidation(rechargesSchema))
rechargesRouter.get("/recharges");

export default rechargesRouter;