const express = require('express');
const router = express.Router();
const catchAsync = require('../helpers/catchAsync');
const User = require('../models/user');

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

module.exports = router;
