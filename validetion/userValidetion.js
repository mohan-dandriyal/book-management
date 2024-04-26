
import Joi from "joi";

export const userValid = Joi.object({
    name : Joi.string().required().min(3),
    contact_no : Joi.string().required().min(10).max(10),
    email : Joi.string().required().email().max(20),
    password : Joi.string().required().min(6).max(16)
})