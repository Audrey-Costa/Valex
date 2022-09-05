import { Router } from "express";
import { createCard, getEmployeeCard, validateCard } from "../controllers/cardsController";
import schemaValidation from "../middlewares/schemaValidationMiddleware";
import { cardsCreateSchema, cardsValidateSchema, passwordValidateSchema }from "../schemas/cardsSchemas";

const cardsRouter = Router();

cardsRouter.post("/cards", schemaValidation(cardsCreateSchema), createCard);
cardsRouter.patch("/cards/:id", schemaValidation(cardsValidateSchema), validateCard);
cardsRouter.post("/cards/employee/:id", schemaValidation(passwordValidateSchema), getEmployeeCard);


export default cardsRouter;