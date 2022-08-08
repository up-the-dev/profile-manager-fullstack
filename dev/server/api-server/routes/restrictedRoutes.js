const router = require('express').Router()
import { loginController, userController } from '../controllers';


router.get('/profile/basicprofile', userController.basicProfile)

router.post('/auth/logout', loginController.logout)

module.exports = router;