const Router = require('express')
const router = new Router()
const {check} = require('express-validator')

const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/me', authMiddleware, userController.getProfileInfo)
router.delete('/me', authMiddleware, userController.deleteProfile)
router.patch('/me/password', [
    check('oldPassword', 'Password cannot be empty').notEmpty(),
    check('newPassword', 'Password cannot be empty').notEmpty(),
], authMiddleware, userController.changePassword)

module.exports = router