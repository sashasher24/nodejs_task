const Router = require('express')
const router = new Router()
const {check} = require('express-validator')

const authController = require('../controllers/authController')

router.post('/register',[
    check('email', 'Email cannot be empty').notEmpty(),
    check('password', 'Password cannot be empty').notEmpty(),
    check('role', 'Role cannot be empty').notEmpty(),
] , authController.registration)

router.post('/login', [
    check('email', 'Email cannot be empty').notEmpty(),
    check('password', 'Password cannot be empty').notEmpty(),
], authController.login)

router.post('/forgot_password', [
    check('email', 'Email cannot be empty').notEmpty(),
], authController.forgotPassword)

module.exports = router