import { Router } from "express";
import { createCard, validateCard } from "../controllers/cardsController";
import schemaValidation from "../middlewares/schemaValidationMiddleware";
import { cardsCreateSchema, cardsValidateSchema }from "../schemas/cardsSchemas";

const cardsRouter = Router();

cardsRouter.post("/cards", schemaValidation(cardsCreateSchema), createCard);
cardsRouter.patch("/cards/:id", schemaValidation(cardsValidateSchema), validateCard);
cardsRouter.get("/cards");


export default cardsRouter;