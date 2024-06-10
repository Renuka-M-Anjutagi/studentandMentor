const Company = require('../models/company');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../utils/config');
const company = require('../models/company');

// define the user controller
const companyController = {
    // define the register method
    createCompany: async (request, response) => {
        try {
            // get the user input from the request body
            const { name, location } = request.body;

             // get the user id from the request object
             const userId = request.userId;

            // check if the username already exists in the database
            const comapny = await Company.findOne({ name });

            // if the username exists, return an error
            if (comapny) {
                return response.status(400).json({ message: 'Company already exists' });
            }

           
            // if the username does not exist, create a new user
            const newCompany = new Company({
                name,
                location,
                createBy:userId,
            });

            // save the user in the database
            const savedCompany = await newCompany.save();

            // return a success message and the saved user
            response.json({ message: 'Company registered', company: savedCompany });
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    },

    // define the getUser method
    getCompany: async (request, response) => {
        try {
            // get the user id from the request object
            const { id } = request.params;

            // find the user by id in the database
            const companies = await Company.find();
            // if the user exists, return the user
            response.json({ message: 'Company found', companies });
        } catch(error) {
            response.status(500).json({ message: error.message });
        }
    },
    // define the updateUser method
getCompByID: async (request, response) => {
    try {
        // get the company id from the request object
        const { id } = request.params;


        // get the user input from the request body
        const { name, location} = request.body;

        // find the comapny by id in the database
        const company = await Company.findById(id);

        // if the comapny does not exist, return an error
        if (!company) {
            return response.status(404).json({ message: 'company not found' });
        }
        // return the user
        response.json({ message: 'Company found', company });
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
},
// define the updateUser method
updateCompByID: async (request, response) => {
    try {
        // get the company id from the request object
        const { id } = request.params;


        // get the user input from the request body
        const { name, location} = request.body;

        // find the comapny by id in the database
        const comapny = await Company.findById(id);

        // if the comapny does not exist, return an error
        if (!comapny) {
            return response.status(404).json({ message: 'comapny not found' });
        }

        // update the comapny
        comapny.name = name ? name : comapny.name;
        comapny.location = location ? location : comapny.location;
     

        // save the updated comapny detail
        const updatedCompany = await comapny.save();

        // return a success message and the updated user
        response.json({ message: 'Company updated', comapny: updatedCompany });
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
},
// define the deleteUser method
deleteCompByID: async (request, response) => {
    try {
        // get the user id from the request object
        const {id} = request.params;

        // find the user by id in the database
        const company = await Company.findById(id);

        // if the user does not exist, return an error
        if (!company) {
            return response.status(404).json({ message: 'Company not found' });
        }

        // delete the comapny
        await Company.findByIdAndDelete(id);

        // clear the token cookie
        response.clearCookie('token');

        // return a success message
        response.json({ message: 'Company deleted' });
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
},
} 

// Export the controller
module.exports = companyController;