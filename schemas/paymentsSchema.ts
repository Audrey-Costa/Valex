import Joi from "joi";

const paymentsSchema = Joi.object({
    amount: Joi.number().greater(0).required()
})

export default paymentsSchema;