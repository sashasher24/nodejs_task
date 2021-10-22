const Truck = require('../models/Truck')
const User = require('../models/User')

class truckController {
  async addTruck(request, response) {
    try{
      const userProfile = await User.findById(request.user.id);
      if(!userProfile) {
        return response.status(400).json({message: 'Bad request'});
      }

      const type = request.body.type;
      const truck = new Truck({
        created_by: request.user.id,
        type: type
      })

      await truck.save();
      return response.status(200).json({message: 'Truck created successfully'});
    }
    catch (e) {
      response.status(500).json({message: 'Internal server error'});
    }
  }


  async showTrucks(request, response) {
    try{
      const userProfile = await User.findById(request.user.id);
      if(!userProfile) {
        return response.status(400).json({message: 'Bad request'});
      }


      return response.status(200).json({message: 'Truck created successfully'});
    }
    catch (e) {
      response.status(500).json({message: 'Internal server error'});
    }
  }

}


module.exports = new truckController()