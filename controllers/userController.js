const User = require('../models/User')

const bcrypt = require('bcryptjs')
const {validationResult} = require('express-validator')
// const jwt = require('jsonwebtoken')
// const {secret} = require('../config')


class userController {
  async getProfileInfo(request, response) {
    try {
      const userProfile = await User.findById(request.user.id);
      if(!userProfile) {
        return response.status(400).json({message: 'Bad request'});
      }

      return response.status(200).send({
        'user': {
          '_id': userProfile.id,
          'role': userProfile.role,
          'email': userProfile.email,
          'created_date': userProfile.createdDate,
          'password': userProfile.password
        }
      })
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
      const errors = validationResult(request);
      if(!errors.isEmpty()) {
        return response.status(400).json({message: 'Bad request1'});
      }

      const userProfile = await User.findById(request.user.id);
      if(!userProfile) {
        return response.status(400).json({message: 'Bad request2'});
      }

      const {oldPassword, newPassword} = request.body;

      const validOldPassword = await bcrypt.compare(oldPassword, userProfile.password);
      if(!validOldPassword) {
        return response.status(400).json({message: 'Bad request3'});
      }

      const hashedNewPassword = bcrypt.hashSync(newPassword, 7)
      await User.updateOne(userProfile, { password: hashedNewPassword });

      return response.status(200).json({message: 'Password changed successfully'})
    } catch (e) {
      response.status(500).json({message: 'Internal server error'})
    }
  }
}

module.exports = new userController()