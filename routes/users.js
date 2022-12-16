const express = require('express');
const passport = require('passport');
const router = express.Router();
const catchAsync = require('../helpers/catchAsync');
const User = require('../models/user');

// @description     Local Signup
// @route GET       users/signup
router.get('/signup', (req, res) => {
  res.render('users/signup');
});

router.post(
  '/signup',
  catchAsync(async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const user = new User({ email, username });
      const registeredUser = await User.register(user, password);
      req.flash('success', 'Welcome to BugTracker');
      res.redirect(`/tickets`); //change to redirect to dashboard
    } catch (err) {
      req.flash('error', err.message);
      res.redirect('/signup');
    }
  })
);

// @description     Local Login
// @route GET       users/login
router.get('/login', (req, res) => {
  res.render('users/login');
});

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

module.exports = router;
