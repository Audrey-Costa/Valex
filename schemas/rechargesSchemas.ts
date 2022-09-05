import Joi from "joi";

const rechargesSchema = Joi.object({
    amount: Joi.number().greater(0).required()
})

export default rechargesSchema;