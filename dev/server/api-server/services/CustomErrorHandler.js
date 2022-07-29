

class CustomErrorHandler extends Error {

    constructor(status, msg) {
        super()
        this.status = status;
        this.msg = msg
    }

    static alreadyExist(msg) {
        return new CustomErrorHandler(409, msg)
    }
    static wrongCredentials(msg = "Email or Password is wrong !") {
        return new CustomErrorHandler(401, msg)
    }
}
export default CustomErrorHandler