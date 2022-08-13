import joi from 'joi'
export const addressValidator = (req, res, next) => {
    const addressSchema = joi.object({
        addressType: joi.string().required(),
        addressLine1: joi.string().min(2).max(50).required(),
        addressLine2: joi.string().min(2).max(50),
        addressLine3: joi.string().min(2).max(50),
        landmark: joi.string().required().min(2).max(50),
        country: joi.string().required(),
        state: joi.string().required(),
        district: joi.string().required(),
        tehsil: joi.string().required(),
        city: joi.string().required(),
        pincode: joi.string().min(3).required(),
    })
    const { error } = addressSchema.validate(req.body)
    if (error) {
        return next(error)
    }
}