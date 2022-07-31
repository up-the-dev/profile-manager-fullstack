import { CustomErrorHandler, JwtService } from "../services"

const auth = async (req, res, next) => {
    const authheader = req.headers.authorization
    if (!authheader) {
        return next(CustomErrorHandler.unAuthorized())
    }
    const token = authheader.split(' ')[1]
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