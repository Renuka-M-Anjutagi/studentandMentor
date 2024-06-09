const Mentor = require('../models/mentor');
const Student = require('../models/student');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../utils/config');

// define the mentor controller
const mentorController = {
    // define the register method
    create: async (request, response) => {
        try {
            // get the mentor input from the request body
            const { name, email, expertise, studentsAssigned} = request.body;
            
            // check if the name already exists in the database
            const mentor = await Mentor.findOne({ name });

            // if the username exists, return an error
            if (mentor) {
                return response.status(400).json({ message: 'Name already exists,Please try with other name' });
            }
            // if the Mentorname does not exist, create a new mentor
            const newMentor = new Mentor({
                name,
                email,
                expertise,
                studentsAssigned
            });

            // save the Mentor in the database
            const saveMentor = await newMentor.save();

            // return a success message and the saved mentor
            response.json({ message: 'Mentor registered', mentor: saveMentor });
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    },
    
    // define the getmentor method
    getMentor: async (request, response) => {
        try {
            // find the mentor by id in the database
            const mentor = await Mentor.find();

            // if the mentor does not exist, return an error
            if (!mentor) {
                return response.status(404).json({ message: 'Mentor not found' });
            }

            // if the mentor exists, return the mentor
            response.json({ message: 'Mentor found', mentor });
        } catch(error) {
            response.status(500).json({ message: error.message });
        }
    },
    // define the updateMentor method
     assignStudentToMentor : async (req, res, next) => {
        try {
          const { studentId, mentorId } = req.params;
      
          const student = await Student.findByIdAndUpdate(
            studentId,
            { mentorAssigned: mentorId },
            { new: true }
          );
          const mentor = await Mentor.findByIdAndUpdate(
            mentorId,
            { $addToSet: { studentsAssigned: studentId } },
            { new: true }
          );
      
        res.json({ message: 'Mentor found', student, mentor });

        
        } catch (error) {
          next(error);
        }
      },
   
    // define the getStudentById method
    getStudentById: async (request, response) => {
        try {
            // get the student id from the request parameters
            const mentorId = request.params.id;

            // find the student by id in the database
            const student = await Mentor.findById(mentorId).populate("studentsAssigned", "name");

            // if the student does not exist, return an error
            if (!student) {
                return response.status(404).json({ message: 'Student not found' });
            }

            // return the student
            response.json({ message: 'Student found', student });
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    },
    getMentorStudents : async (req, res, next) => {
        try {
          const mentorId = req.params.mentorId;
          const mentor = await Mentor.findById(mentorId).populate("studentsAssigned");
          res.json(mentor.student);
        } catch (error) {
          next(error);
        }
      },
      getNoMentorStudents : async (req, res, next) => {
        try {
          const mentorId = req.params.mentorId;
          const mentor = await Student.find( { "studentsAssigned" : null });
          res.json(student.mentor);
        } catch (error) {
          next(error);
        }
      },
     getPreviousMentor : async (req, res, next) => {
        try {
          const studentId = req.params.studentId;
          const student = await Student.findById(studentId).populate("mentor");
          res.json(student.mentor);
        } catch (error) {
          next(error);
        }
      }
      
} 

// Export the controller
module.exports = mentorController;