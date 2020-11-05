const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
    cv_name        : { type: String }, 
    image          : { type: String },
    dob            : { type: String },
    number         : { type: String },
    email          : { type: String },
    address        : { type: String },
    bio            : { type: String },
    experience     : { type: String }, // Array of { Job Title, From, To, Responsibilities list}   
    education      : { type: String }, // Array of { Degree, Institute, From, To }
    skills         : { type: String }, 
    languages      : { type: String },
    interests      : { type: String },
    certifications : { type: String },
    created        : { type: Date,   default: Date.now }
});

const Resume = mongoose.model('Resume', resumeSchema);


module.exports = Resume;
