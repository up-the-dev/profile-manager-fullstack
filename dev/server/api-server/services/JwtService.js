import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config'
class JwtService {
    static sign(payload, secret = JWT_SECRET, expiry = '300s') {
        return jwt.sign(payload, secret, { expiresIn: expiry })

    }
    static verify(token, secret = JWT_SECRET) {
        return jwt.verify(token, secret)
    }
}
export default JwtService