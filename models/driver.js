const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PointSchema = new Schema({
  type: {
    type: String,
    default: 'Point'
  },
  coordinates: {
    type: [Number],
    createIndexes: '2dsphere' // specific to this situation where Mongodb will recognise such index since Mongodb natively support this
  }
})

const DriverSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  driving: {
    type: Boolean,
    default: false
  },
  geometry: PointSchema,
})

const Driver = mongoose.model('driver', DriverSchema);

module.exports = Driver;
