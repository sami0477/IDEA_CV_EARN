const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

const app = express();
const PORT = process.env.PORT || 5000;


// Passport Config
require('./config/passport')(passport);
// Mongoose Middleware
mongoose.connect('mongodb://localhost:27017/dummyCV', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
.then(console.log('Mongo DB Connected'))
.catch(err => console.log(err));
// EJS Middleware
app.use(expressLayouts);
app.set('view engine', 'ejs');
// Bodyparser Middleware
app.use(express.urlencoded({ extended:true }));
// Express Session Middleware
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
// Connect Flash Middleware
app.use(flash());
// Method Override Middleware
app.use(methodOverride('_method'));
// Static Files
app.use(express.static(path.join(__dirname, 'public')));


// Global Variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});


// Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/users/cv', require('./routes/cv'));


// Listen
app.listen(PORT, console.log(`Server running on Port ${PORT}`));