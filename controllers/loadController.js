const Load = require('../models/Load')
const User = require('../models/User')

class loadController {
  async addLoad(request, response) {
    try{
      const userProfile = await User.findById(request.user.id);
      if(!userProfile) {
        return response.status(400).json({message: 'Bad request'});
      }

      const {name, payload, pickup_address, delivery_address, dimensions} = request.body;
      const load = new Load({
        created_by: request.user.id,
        name: name,
        payload: payload,
        pickup_address: pickup_address,
        delivery_address: delivery_address,
        dimensions: dimensions
      })

      await load.save();
      return response.status(200).json({message: 'Load created successfully'});
    }
    catch (e) {
      response.status(500).json({message: 'Internal server error'});
    }
  }


  // async showLoads(request, response) {
  //   try{
  //     const userProfile = await User.findById(request.user.id);
  //     if(!userProfile) {
  //       return response.status(400).json({message: 'Bad request'});
  //     }
  //
  //
  //     return response.status(200).json({message: 'Truck created successfully'});
  //   }
  //   catch (e) {
  //     response.status(500).json({message: 'Internal server error'});
  //   }
  // }

}


module.exports = new loadController()