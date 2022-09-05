import { Router } from "express";
import { createCard } from "../controllers/cardsController";
import schemaValidation from "../middlewares/schemaValidationMiddleware";
import cardsSchema from "../schemas/cardsSchemas";

const cardsRouter = Router();

cardsRouter.post("/cards", schemaValidation(cardsSchema), createCard);
cardsRouter.get("/cards");

export default cardsRouter;