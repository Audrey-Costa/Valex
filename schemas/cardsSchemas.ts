import Joi from "joi";

const cardsSchema = Joi.object({
    employeeId: Joi.number().integer().positive().required(),
    type: Joi.string().valid('groceries', 'restaurants', 'transport', 'education', 'health').required()
})

export default cardsSchema;