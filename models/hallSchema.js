
const mongoose = require('mongoose');

const hallSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      unique: true,
    },
    location: {
      type: String,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },  
    amenities: {
      type: String,
      required: true,
    },  
    description: {
      type: String,
      required: true,
    },
    hallCreater: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now
  },
  });

// create a model and export it

module.exports = mongoose.model('HallBook', hallSchema, 'halls');