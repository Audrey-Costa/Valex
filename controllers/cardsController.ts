import { Request, Response } from "express";
import * as cardServices from "../services/cardsCreatorServices"

export async function createCard(req: Request, res: Response){
    const { 'x-api-key': apiKey } = req.headers;
    const {employeeId, type} = req.body;

    await cardServices.createCard(apiKey, employeeId, type)
    res.sendStatus(201);
}