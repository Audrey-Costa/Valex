import { Request, Response } from "express";
import * as rechargeService from "../services/rechargeService"

export async function recharge(req: Request, res: Response){
    const { amount } = req.body;
    const cardId = Number(req.params.id);
    const { 'x-api-key': apiKey } = req.headers;

    await rechargeService.recharge(apiKey, cardId, amount);
    res.sendStatus(201);
}