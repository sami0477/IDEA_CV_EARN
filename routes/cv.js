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
// --------------------- Show ----------------------
router.get('/:id', (req, res) => {
    Resume.findById(req.params.id, (err, foundResume) => {
        if(err){
            res.redirect('/users/cv');
        } else {
            res.render('cv/show', {resume: foundResume});
        }
    });
});
// --------------------- Edit ----------------------
router.get('/:id/edit', (req, res) => {
    Resume.findById(req.params.id, (err, foundResume) => {
        if(err){
            res.redirect('back');
        } else{
            res.render('cv/edit', {resume: foundResume});
        }
    });
});
// --------------------- Update ----------------------
router.put('/:id', (req, res) => {
    // req.body.blog.body = req.sanitize(req.body.blog.body);
    Resume.findByIdAndUpdate(req.params.id, req.body.resume, (err, updatedResume) => {
        if(err){
            res.redirect('back');
        } else {
            res.redirect('/users/cv/' + req.params.id)
        }
    });
});

// --------------------- Delete ----------------------
// Delete
router.delete('/:id', (req, res) => {
        Resume.findByIdAndRemove(req.params.id, (err, removeResume) => {
            if (err) {
                res.redirect('back');
            } else {
                // Redirect
                res.redirect('/users/cv');
            }
        });
    });



module.exports = router;