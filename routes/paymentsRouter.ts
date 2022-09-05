import { Router } from "express";
import schemaValidation from "../middlewares/schemaValidationMiddleware";
import paymentsSchema from "../schemas/paymentsSchema";

const paymentsRouter = Router();

paymentsRouter.post("/payments", schemaValidation(paymentsSchema))
paymentsRouter.get("/payments");

export default paymentsRouter;