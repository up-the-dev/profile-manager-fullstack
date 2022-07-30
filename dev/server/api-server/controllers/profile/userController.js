import { User } from "../../models"
import { CustomErrorHandler } from "../../services"

const userController = {
    async basicProfile(req, res, next) {
        try {
            const user = await User.findOne({ _id: req.user._id }).select('-password -__v -updatedAt')
            if (!user) {
                return next(CustomErrorHandler.notFound("user not found !"))
            }
            res.send(user)
        } catch (err) {
            console.log(err)
            return next(err)
        }
    }
}
export default userController