const mongoose = require('mongoose');

// create a schema
const BookingSchema = new mongoose.Schema({
    numberOfSeatsAvailable: Number,
    amenitiesInRoom: Array,
    pricePerHour: Number,
    createdAt: {
        type: Date,
        default: Date.now
    },
});

// create a model and export it

module.exports = mongoose.model('Booking', BookingSchema, 'bookings');