import { Request, Response } from "express";
import * as cardCreatorServices from "../services/cardsCreatorServices"
import * as cardValidatorServices from "../services/cardsValidatorServices"

export async function createCard(req: Request, res: Response){
    const { 'x-api-key': apiKey } = req.headers;
    const {employeeId, type} = req.body;

    await cardCreatorServices.createCard(apiKey, employeeId, type);
    res.sendStatus(201);
}

export async function validateCard(req: Request, res: Response){
    const id = Number(req.params.id);
    const { securityCode, password } = req.body;

    await cardValidatorServices.validateCard( id, securityCode, password );
    res.sendStatus(201);
}