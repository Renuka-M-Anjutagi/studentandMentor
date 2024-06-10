const mongoose = require('mongoose');

// create a schema
const jobSchema = new mongoose.Schema({
    Title: String,
    description: String,
    location: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['open', 'close'],
        default: 'open'
    },
    type:{
        type:String,
        enum:['full-time','part-time','freelance'],
        default: 'full-time'
    },
    company:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Company'
    },
    applicants:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    

});

// create a model and export it

module.exports = mongoose.model('Job', jobSchema, 'jobs');