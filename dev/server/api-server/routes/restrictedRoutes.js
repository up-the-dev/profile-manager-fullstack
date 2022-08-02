const router = require('express').Router()
import userController from '../controllers/profile/userController'

router.get('/profile/basicprofile', userController.basicProfile)

module.exports = router;