import { Request, Response, NextFunction } from "express";

const schemaValidation = (schema: any) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body, {abortEarly: false});
        if (error) {
            throw {type: "Bad Request", message: error.details.map((detail: any) => detail.message)};
        }
      next();
    };
  };
  
  export default schemaValidation;