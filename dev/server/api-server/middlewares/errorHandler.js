import { DEBUG_MODE } from '../config'
import { ValidationError } from 'joi'
import { CustomErrorHandler } from '../services'
const errorHandler = (err, req, res, next) => {
    let statusCode = 500
    let data = {
        msg: "Internal Server Error",
        ...(DEBUG_MODE === "true" && { original_Error: err.message })

    }
    if (err instanceof ValidationError) {

        statusCode = 422
        data = {
            msg: err.message
        }

    }
    if (err instanceof CustomErrorHandler) {

        statusCode = err.status

        data = {
            msg: err.msg
        }

    }
    res.status(statusCode).json(data)
}
export default errorHandler