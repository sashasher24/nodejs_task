const User = require('../models/User')

const bcrypt = require('bcryptjs')
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const {secret} = require('../config')

const generateAccessToken = (id) => {
  const payload = {id}

  return jwt.sign(payload, secret, {expiresIn: "24h"})
}

class authController {
  async registration(request, response) {
    try {
      const errors = validationResult(request)
      if(!errors.isEmpty()) {
        return response.status(400).json({message: 'Bad request'});
      }

      const {email, password, role} = request.body;

      const hashedPassword = bcrypt.hashSync(password, 7)
      const user = new User({email, password: hashedPassword, role})

      await user.save()
      return response.status(200).send({message: 'Profile created successfully'})
    } catch (e) {
      response.status(500).json({message: 'Internal server error'})
    }
  }

  async login(request, response) {
    try {
      const errors = validationResult(request)
      if(!errors.isEmpty()) {
        return response.status(400).json({message: 'Bad request'});
      }

      const {email, password} = request.body

      const user = await User.findOne({email})
      if(!user) {
        return response.status(400).json({message: 'Bad request1'})
      }

      const validPassword = bcrypt.compareSync(password, user.password)
      if(!validPassword) {
        return response.status(400).json({message: 'Bad request2'})
      }

      const token = generateAccessToken(user._id)
      return response.status(200).json({jwt_token: token})
    } catch (e) {
      console.log(e)
      response.status(500).json({message: 'Internal server error'})
    }
  }

  async forgotPassword(request, response) {
    try {
      const errors = validationResult(request)
      if(!errors.isEmpty()) {
        return response.status(400).json({message: 'Bad request'});
      }

      const {email} = request.body

      const user = await User.findOne({email})
      if(!user) {
        return response.status(400).json({message: 'Bad request1'})
      }

      return response.status(200).json({message: 'New password sent to your email address'})
    } catch (e) {
      response.status(500).json({message: 'Internal server error'})
    }
  }
}

module.exports = new authController()