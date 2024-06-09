const Student = require('../models/student');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../utils/config');

// define the user controller
const studentController = {
    // define the register method
    create: async (request, response) => {
        try {
            // get the user input from the request body
            const { name, email, course, mentorAssigned} = request.body;

            // check if the username already exists in the database
            const student = await Student.findOne({ name });

            // if the username exists, return an error
            if (student) {
                return response.status(400).json({ message: 'Name already exists,Please try with other name' });
            }
            // if the Studentname does not exist, create a new student
            const newStudent = new Student({
                name,
                email,
                course,
                mentorAssigned
            });

            // save the student in the database
            const saveStudent = await newStudent.save();

            // return a success message and the saved student
            response.json({ message: 'Student registered', student: saveStudent });
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    },
    
    // define the getStudent method
    getStudent: async (request, response) => {
        try {
            // find the Student by id in the database
            const student = await Student.find();

            // if the user does not exist, return an error
            if (!student) {
                return response.status(404).json({ message: 'Student not found' });
            }

            // if the user exists, return the user
            response.json({ message: 'Student found', student });
        } catch(error) {
            response.status(500).json({ message: error.message });
        }
    },
    // define the updateUser method
    updateStudent: async (request, response) => {
        try {
            // get the student id from the request object
            const studentId = request.studentId;

            // get the student input from the request body
            const { name,email,course,mentorAssigned } = request.body;

            // find the student by id in the database
            const student = await Student.findById(studentId);

            // if the user does not exist, return an error
            if (!student) {
                return response.status(404).json({ message: 'Student not found' });
            }

            // update the student
            student.name = name ? name : student.name;
            student.email = email ? email : student.email;
            student.mentorAssigned = mentorName ? mentorName : student.mentorAssigned;

            // save the updated student
            const updateStudent = await student.save();

            // return a success message and the updated student
            response.json({ message: 'Student updated', student: updateStudent });
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    },
    // define the deleteUser method
    deleteUser: async (request, response) => {
        try {
            // get the user id from the request object
            const userId = request.userId;

            // find the user by id in the database
            const user = await User.findById(userId);

            // if the user does not exist, return an error
            if (!user) {
                return response.status(404).json({ message: 'User not found' });
            }

            // delete the user
            await User.findByIdAndDelete(userId);

            // clear the token cookie
            response.clearCookie('token');

            // return a success message
            response.json({ message: 'User deleted' });
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    },
    // define the getUsers method
    getUsers: async (request, response) => {
        try {
            // find all the users in the database
            const users = await User.find();

            // return the users
            response.json({ message: 'Users found', users });
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    },
    // define the getUserById method
    getMentorById: async (request, response) => {
        try {
            // get the mentor id from the request parameters
            const mentorId = request.params.mentorAssigned;

            console.log(mentorId);
            // find the mentor by id in the database
            const student = await Student.findById(mentorId);

            // if the mentor does not exist, return an error
            if (!student) {
                return response.status(404).json({ message: 'Student not found' });
            }

            // return the mentor
            response.json({ message: 'Student found', student });
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    },
     // define the updateUserById method
     updateUserById: async (request, response) => {
        try {
            // get the user id from the request parameters
            const userId = request.params.id;

            // get the user input from the request body
            const { username, name } = request.body;

            // find the user by id in the database
            const user = await User.findById(userId);

            // if the user does not exist, return an error
            if (!user) {
                return response.status(404).json({ message: 'User not found' });
            }

            // update the user
            user.username = username ? username : user.username;
            user.name = name ? name : user.name;

            // save the updated user
            const updatedUser = await user.save();

            // return a success message and the updated user
            response.json({ message: 'User updated', user: updatedUser });
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    },
    // define the deleteUserById method
    deleteUserById: async (request, response) => {
        try {
            // get the user id from the request parameters
            const userId = request.params.id;

            // find the user by id in the database
            const user = await User.findById(userId);

            // if the user does not exist, return an error
            if (!user) {
                return response.status(404).json({ message: 'User not found' });
            }

            // delete the user
            await User.findByIdAndDelete(userId);

            // return a success message
            response.json({ message: 'User deleted' });
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    }
} 

// Export the controller
module.exports = studentController;