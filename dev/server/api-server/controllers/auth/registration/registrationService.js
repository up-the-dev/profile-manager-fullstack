import Joi from "joi"
const registrationService = {
    Validation(req, res, next) {
        const registerSchema = Joi.object({
            firstName: Joi.string().min(2).max(30).required(),
            lastName: Joi.string().min(1).max(30).required(),
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-z0-9#@]{6,30}$')).required(),
            repeat_password: Joi.ref('password')
        })
        const { error } = registerSchema.validate(req.body)
        if (error) {
            return next(error)
        }
    }
}
export default registrationService