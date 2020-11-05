const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const passport = require('passport');


// Login Page
router.get('/login', (req, res) => {
    res.render('index/login');
});
// Register Page
router.get('/register', (req, res) => {
    res.render('index/Register');
});
// Register Handle
router.post('/register', (req, res) => {
    const { name, email, password, password2 } = req.body;
    let errors = [];
    // Check required fields
    if(!name || !email || !password || !password2){
        errors.push({ msg: 'Please Fill in all Fields' });
    }
    // Check Passwords Match
    if(password !== password2){
        errors.push({ msg: 'Passwords do not match' });
    }
    // Check Password Length
    if(password.length < 6){
        errors.push({ msg: 'Password should be at least 6 characters' });
    }
    if (errors.length > 0) {
        res.render('register', {
          errors,
          name,
          email,
          password,
          password2
        });
      } else {
        User.findOne({ email: email }).then(user => {
          if (user) {
            errors.push({ msg: 'Email already exists' });
            res.render('register', {
              errors,
              name,
              email,
              password,
              password2
            });
          } else {
            // Create New Instance
            const newUser = new User({
              name,
              email,
              password
            });
            // Hash Password
            bcrypt.genSalt(10, (err, salt) => {

                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    // Error Handling
                    if (err) throw err;
                    // Hashed Password
                    newUser.password = hash;
                    // Save User To DB
                    newUser.save()
                    // .then(res.render('login'))
                    .then(user => {
                      req.flash('success_msg', 'Registration Successful!');
                      res.redirect('/users/login');
                    })
                    .catch(err => console.log(err));
                });
            });
          }
        });
    }
});

// Login Handle
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

// Logout Handle
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'Successfully logged out');
  res.redirect('/users/login');
});


module.exports = router;