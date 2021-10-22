const {Schema, model} = require('mongoose')

const LoadSchema = new Schema({
  created_by: {
    type: String,
    required: true
  },
  assigned_to: {
    type: String,
    default: null
  },
  status: {
    type: String,
    Enum: [ 'NEW', 'POSTED', 'ASSIGNED', 'SHIPPED' ],
    default: 'NEW'
  },
  state: {
    type: String,
    Enum: ['En route to Pick Up', 'Arrived to Pick Up', 'En route to delivery', 'Arrived to delivery'],
    default: 'En route to Pick Up'
  },
  name: {
    type: String,
    required: true
  },
  payload: {
    type: Number,
    required: true
  },
  pickup_address: {
    type: String,
    required: true
  },
  delivery_address: {
    type: String,
    required: true
  },
  dimensions: {
    width: {
      type: Number
    },
    length: {
      type: Number
    },
    height: {
      type: Number
    },
  },
  logs: {
    type: [{
      message: {
        type: String,
        default: 'waiting for driver'
      },
      time: {
        type: Date,
        default: Date.now()
      },
    }]
  },
  createdDate: {
    type: Date,
    default: Date.now()
  }
})

module.exports = model('Load', LoadSchema);