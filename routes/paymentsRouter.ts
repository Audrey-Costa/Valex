import { Router } from "express";
import { payment } from "../controllers/paymentController";
import schemaValidation from "../middlewares/schemaValidationMiddleware";
import paymentsSchema from "../schemas/paymentsSchema";

const paymentsRouter = Router();

paymentsRouter.post("/payments/:cardId", schemaValidation(paymentsSchema), payment);

export default paymentsRouter;