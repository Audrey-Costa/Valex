import Joi from "joi";

const paymentsSchema = Joi.object({
    amount: Joi.number().greater(0).required(),
    password: Joi.string().regex(/([0-9]{4})/).required(),
    businessId: Joi.number().integer().positive().required()
})

export default paymentsSchema;