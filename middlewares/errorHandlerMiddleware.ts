import { NextFunction, Request, Response } from "express";

export default async function errorHandlerMiddleware(error: any, req: Request, res: Response, next: NextFunction){
    if (error.type === "Not Found"){
        return res.status(404).send(error.message)
    }
    if (error.type === "Unauthorized"){
        return res.status(401).send(error.message)
    }
    if(error.type === "Conflict"){
        return res.status(409).send(error.message);
    }
    if(error.type === "Bad Request"){
        return res.status(400).send(error.message);
    }
    if(error.type === "Forbidden"){
        return res.status(403).send(error.message);
    }
    return res.sendStatus(500);
}