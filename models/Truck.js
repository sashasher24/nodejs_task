const {Schema, model} = require('mongoose')

const TruckSchema = new Schema({
  created_by: {
    type: String,
    required: true
  },
  assigned_to: {
    type: String,
    // required: true,
    default: null
  },
  type: {
    type: String,
    required: true,
    Enum: [ 'SPRINTER', 'SMALL STRAIGHT', 'LARGE STRAIGHT' ]
  },
  status: {
    type: String,
    // required: true,
    Enum: [ 'OL', 'IS' ],
    default: 'IS'

  },
  createdDate: {
    type: Date,
    default: Date.now()
  }
})

module.exports = model('Truck', TruckSchema);