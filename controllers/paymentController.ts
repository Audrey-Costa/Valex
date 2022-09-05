import { Request, Response } from "express";
import * as paymentService from "../services/paymentService"

export async function payment(req: Request, res: Response){
    const { businessId, amount, password } = req.body;
    const cardId = Number(req.params.cardId);
    console.log(businessId, cardId)
    await paymentService.payment(cardId, businessId, amount, password);
    res.sendStatus(201);
}