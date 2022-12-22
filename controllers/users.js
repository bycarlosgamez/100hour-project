const User = require('../models/user');

module.exports = {
  getSignup: (req, res) => {
    res.render('users/signup');
  },
  signup: async (req, res, next) => {
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
  },
  getLogin: (req, res) => {
    res.render('users/login');
  },
  login: (req, res) => {
    req.flash('success', 'Welcome back');
    const redirectUrl = req.session.returnTo || '/tickets';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
  },
  logout: (req, res) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      req.flash('success', 'You are now logged out');
      res.redirect('/');
    });
  },
};
