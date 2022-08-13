const router = require('express').Router()
import { loginController, profileController, addressController } from '../controllers';

router.post('/profile/address', addressController.update)
router.get('/profile/address', addressController.getselfAddress)
router.get('/profile/addrress/:profileId', addressController.getIdAddress)

router.get('/profile/basicprofile', profileController.selfProfile)
router.get('/profile/basicprofile/:profileId', profileController.getIdProfile)

router.post('/auth/logout', loginController.logout)


module.exports = router;