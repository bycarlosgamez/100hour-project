const express = require('express');
const passport = require('passport');
const router = express.Router();
const catchAsync = require('../helpers/catchAsync');
const User = require('../models/user');

// @description     Show Signup page
// @route           GET /signup
router.get('/signup', (req, res) => {
  res.render('users/signup');
});

// @description     Process Signup form
// @route           POST /signup
router.post(
  '/signup',
  catchAsync(async (req, res, next) => {
    try {
      const { username, email, password } = req.body;
      const user = new User({ email, username });
      const registeredUser = await User.register(user, password);
      req.login(registeredUser, (err) => {
        if (err) {
          return next(err);
        }
        req.flash('success', 'Welcome to BugBust');
        res.redirect('/tickets'); //change to dashbboard
      });
    } catch (err) {
      req.flash('error', err.message);
      res.redirect('/signup');
    }
  })
);

// @description     Show Login page
// @route           GET /login
router.get('/login', (req, res) => {
  res.render('users/login');
});

// @description     Process Login form
// @route           POST /login
router.post(
  '/login',
  passport.authenticate('local', {
    failureFlash: true,
    failureRedirect: '/login',
  }),
  catchAsync(async (req, res) => {
    try {
      req.flash('success', 'Welcome back');
      res.redirect('/tickets');
    } catch (err) {
      req.flash('error', err.message);
      res.redirect('/login');
    }
  })
);

// @description     Process logout
// @route           POST /logout
router.post('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash('success', 'You are now logged out');
    res.redirect('/');
  });
});

module.exports = router;
