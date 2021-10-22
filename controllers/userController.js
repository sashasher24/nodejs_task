const User = require('../models/User')

const bcrypt = require('bcryptjs')
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const {secret} = require('../config')


class userController {
  async getProfileInfo(request, response) {
    try {
      const userProfile = await User.findById(request.user.id, {
        __v: 0,
        password: 0
      });
      if(!userProfile) {
        return response.status(400).json({message: 'Bad request'});
      }

      return response.status(200).send(userProfile)
    } catch (e) {
      response.status(500).json({message: 'Internal server error'})
    }
  }


  async deleteProfile(request, response) {
    try {
      const userProfile = await User.findById(request.user.id);
      if(!userProfile) {
        return response.status(400).json({message: 'Bad request'});
      }

      await User.deleteOne(userProfile);

      return response.status(200).json({message: 'Profile deleted successfully'})
    } catch (e) {
      console.log(e)
      response.status(500).json({message: 'Internal server error'})
    }
  }


  async changePassword(request, response) {
    try {


      return response.status(200).json({message: 'Password changed successfully'})
    } catch (e) {
      response.status(500).json({message: 'Internal server error'})
    }
  }
}

module.exports = new userController()