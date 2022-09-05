import Joi from "joi";

const cardsCreateSchema = Joi.object({
    employeeId: Joi.number().integer().positive().required(),
    type: Joi.string().valid('groceries', 'restaurants', 'transport', 'education', 'health').required()
})

const cardsValidateSchema = Joi.object({
    securityCode: Joi.string().regex(/([0-9]{3})/).required(),
    password: Joi.string().regex(/([0-9]{4})/).required()
})

const passwordValidateSchema = Joi.object({
    password: Joi.string().regex(/([0-9]{4})/).required()
})

export { cardsCreateSchema, cardsValidateSchema, passwordValidateSchema};