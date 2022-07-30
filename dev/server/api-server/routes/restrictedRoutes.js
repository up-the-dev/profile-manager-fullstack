const router = require('express').Router()
import userController from '../controllers/profile/userController'

router.get('/r/profile/basicprofile', userController.basicProfile)

module.exports = router;