const express = require('express');
const router = express.Router();
const Resume = require('../models/Resume');

const { ensureAuthenticated } = require('../config/auth');


// ----------------------Display----------------------
router.get('/', (req, res) => {
    // res.render('home');
    Resume.find({}, (err, resume) => {
        if(err){
            console.log("ERROR!");
        } else{
            // Display All Blogs
            res.render('cv/home', {resume: resume});
        }
    });
});
// -----------------------Create----------------------
router.get('/new', (req, res) => {
    res.render('cv/new');
});
// --------------------Create Logic-------------------
router.post('/', (req, res) => {
    Resume.create(req.body.resume, function(err, newresume){
        if(err){
            res.render('cv/new');
        } else{
            // Redirect To Index
            res.redirect('/users/cv');
        }
    });
});
module.exports = router;