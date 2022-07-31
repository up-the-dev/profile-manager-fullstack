import { defaults } from "joi"
import { CustomErrorHandler, JwtService } from "../services"

const auth = async (req, res, next) => {
    const header = req.headers.authorization
    if (!header) {
        return next(CustomErrorHandler.unAuthorized())
    }
    const token = header.split(' ')[1]
    try {
        const { _id, role } = await JwtService.verify(token)
        const user = {
            _id,
            role
        }
        req.user = user

    } catch (err) {
        return next(CustomErrorHandler.unAuthorized())
    }
    next()
}

export default auth