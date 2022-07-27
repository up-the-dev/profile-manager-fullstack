const router = require('express').Router()
import { loginController, registerController } from '../controllers'


router.post('/register', registerController.register)
router.post('/login', loginController.login)




module.exports = router;