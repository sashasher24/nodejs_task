const jwt = require('jsonwebtoken')
const {secret} = require('../config')
const User = require('../models/User')


module.exports = async (request, response, next) => {
  try {
    const token = request.headers.authorization.split(' ')[1];
    if(!token) {
      return response.status(401).json({message: "User not authorized"});
    }

    const decoded = jwt.verify(token, secret); // gets user id
    // console.log(decoded)

    const userProfile = await User.findById(decoded.id);
    // console.log(userProfile)
    const userRole = userProfile.role;
    if(userRole !== 'SHIPPER') {
      return response.status(400).json({message: "Bad requestM"});
    }

    request.user = decoded; // = user id
    next();
  }
  catch (e) {
    return response.status(400).json({message: "Bad request"});
  }
}