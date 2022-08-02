const router = require('express').Router()
import { loginController, refreshTokenController, registerController } from '../controllers'

router.post('/auth/register', registerController.register)
router.post('/auth/login', loginController.login)

router.post('/auth/refreshToken', refreshTokenController.refresh)

module.exports = router;