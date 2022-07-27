import joi from 'joi'
import bcrypt from 'bcrypt'
import { User } from '../../models'
import { CustomErrorHandler, JwtService } from '../../services'

const loginController = {
    async login(req, res, next) {
        const requestSchema = joi.object({
            email: joi.string().email().required(),
            password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8}$')).required()
        })
        const { error } = requestSchema.validate(req.body)
        if (error) {
            return next(error)
        }

        let access_token
        try {
            const user = await User.findOne({ email: req.body.email })
            if (!user) {
                return next(CustomErrorHandler.wrongCredentials("user not registered ! please register first !"))
            }

            const match = await bcrypt.compare(req.body.password, user.password)
            if (!match) {
                return next(CustomErrorHandler.wrongCredentials('wrong password !'))
            }

            access_token = JwtService.sign({ name: user.name, email: user.email, role: user.role })


        } catch (err) {
            return next(err)
        }
        res.json({ access_token })
    }
}
export default loginController