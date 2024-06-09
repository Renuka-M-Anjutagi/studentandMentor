const Job = require('../models/job');
const Company = require('../models/company');

// define the user controller
const jobController = {
    // define the register method
    createJob: async (request, response) => {
        try {
            // get the user input from the request body
            const { title, description,location,type,companyID } = request.body;

             
           
            // if the username does not exist, create a new user
            const newJob = new Job({
                title,
                description,
                location,
                type,
                company:companyID,
                createBy:request.userId,
            });

            // save the user in the database
            const savedJob= await newJob.save();

            // return a success message and the saved user
            response.json({ message: 'Company Job registered', jobs: savedJob });
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    },

    // define the getUser method
    getJobs: async (request, response) => {
        try {
            // get the user id from the request object
            const { id } = request.params;

            // find the user by id in the database
            const jobs = await Job.find();
            // if the user exists, return the user
            response.json({ message: 'Job found', jobs });
        } catch(error) {
            response.status(500).json({ message: error.message });
        }
    },
    getJob: async (request, response) => {
        try {
            // get the job ID from the request parameters
            const { id } = request.params;

            // get the job details from the database
            const job = await Job.findById(id);

            // send the response
            response.status(200).json({ job });
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    },
    updateJob: async (request, response) => {
        try {
            // get the job ID from the request parameters
            const { id } = request.params;

            // get the job details from the request body
            const { title, description, location, type, status } = request.body;

            // update the job details
            const updatedJob = await Job.findByIdAndUpdate(id, { title, description, location, type, status }, { new: true });

            // send the response
            response.status(200).json({ message: 'Job updated successfully', job: updatedJob });
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    },
    deleteJob: async (request, response) => {
        try {
            // get the job ID from the request parameters
            const { id } = request.params;

            // delete the job from the database
            await Job.findByIdAndDelete(id);

            // send the response
            response.status(200).json({ message: 'Job deleted successfully' });
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    },
    // apply for a job
    applyJob: async (request, response) => {
        try {
            // get the job ID from the request parameters
            const { id } = request.params;

            // get the user ID from the request
            const userID = request.userId;

            // get the job details
            const job = await Job.findById(id);

            // check if the user has already applied for the job
            if (job.applicants.includes(userID)) {
                return response.status(400).json({ message: 'You have already applied for this job' });
            }

            // add the user to the applicants list
            job.applicants.push(userID);

            // save the job to the database
            await job.save();

            // send the response
            response.status(200).json({ message: 'You have successfully applied for the job' });
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    },
    // get the jobs applied by a user
    getAppliedJobs: async (request, response) => {
        try {
            // get the user ID from the request
            const userID = request.userId;

            // get the jobs applied by the user
            const jobs = await Job.find({ applicants: userID });

            // send the response
            response.status(200).json({ jobs });
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    },
    // get the applicants for a job
    getApplicants: async (request, response) => {
        try {
            // get the job ID from the request parameters
            const { id } = request.params;

            // get the job details
            const job = await Job.findById(id);

            // get the applicants for the job
            const applicants = await User.find({ _id: { $in: job.applicants } });

            // send the response
            response.status(200).json({ applicants });
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    },
} 

// Export the controller
module.exports = jobController;