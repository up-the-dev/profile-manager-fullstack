const router = require('express').Router()
import { loginController, registerController } from '../controllers'

router.post('/o/auth/register', registerController.register)
router.post('/o/auth/login', loginController.login)

module.exports = router;