import joi from 'joi'
const loginService = {
    Validation(req, res, next) {
        const loginSchema = joi.object({
            email: joi.string().email().required(),
            password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8}$')).required()
        })
        const { error } = loginSchema.validate(req.body)
        if (error) {
            return next(error)
        }
    }
}
export default loginService