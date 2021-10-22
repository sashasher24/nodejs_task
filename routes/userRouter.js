const Router = require('express')
const router = new Router()

const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/me', authMiddleware, userController.getProfileInfo)
router.delete('/me', authMiddleware, userController.deleteProfile)
router.patch('/me/password', userController.changePassword)

module.exports = router