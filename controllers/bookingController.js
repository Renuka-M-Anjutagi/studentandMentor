const Booking = require('../models/booking');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../utils/config');

// define the user controller
const bookingController = {
    // define the register method
    createBooking: async (request, response) => {
        try {
            // get the user input from the request body
            const { numberOfSeatsAvailable,
                amenitiesInRoom,
                pricePerHour,} = request.body;
            
           
            // if the username does not exist, create a new user
            const newBooking = new Booking({
                numberOfSeatsAvailable,
                amenitiesInRoom,
                pricePerHour
            });

            // save the user in the database
            const savedBooking = await newBooking.save();

            // return a success message and the saved user
            response.json({ message: 'Hall Booked', booking: savedBooking });
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    },
 // define the getHallName method
    getHalls: async (request, response) => {
    try {
        // get the user id from the request object
        const { id } = request.params;

        console.log(id);
        // get the user input from the request body
        const { customername, startDate,endDate,phoneNo,emailID,bookAmount} = request.body;

        // find the comapny by id in the database
        const booking = await Booking.findById(id);

        // if the comapny does not exist, return an error
        if (!booking) {
            return response.status(404).json({ message: 'booking not found' });
        }
        // return the user
        response.json({ message: 'Company found', booking });
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
},
  // define the getHallName method
getHallsBYDate: async (request, response) => {
    try {
        // get the user id from the request object
        const { BookedID } = request.params.id;

        //console.log(BookedID);
        // get the user input from the request body
     const { customername, startDate,endDate,phoneNo,emailID,bookAmount} = request.body;

        // find the comapny by id in the database
        const booking = await Booking.findALl({BookedID});
        console.log(booking);
        // if the comapny does not exist, return an error   
        if (!booking) {
            return response.status(404).json({ message: 'booking not found' });
        }
        // return the user
        response.json({ message: 'Company found', booking });
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
},
    
} 

// Export the controller
module.exports = bookingController;