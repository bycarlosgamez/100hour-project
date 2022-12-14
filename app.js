// Allows us to hace acces to varialves in our .env file in developer mode
if (process.env.NODE_ENV !== 'producion') {
  require('dotenv').config({ path: './config/.env' });
}

const express = require('express');
const app = express();
const path = require('path');
const ejsmate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');
const connectDB = require('./config/database');
const ExpressError = require('./helpers/ExpressError');
const methodOverride = require('method-override');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');

// Routers
const usersRoutes = require('./routes/users');
const ticketsRoutes = require('./routes/tickets');
const commentsRoutes = require('./routes/comments');

// Session Config
const sessionConfig = {
  secret: 'secretstringchangeinproduction',
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

// Connects our DB to server
connectDB();

app.engine('ejs', ejsmate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// configurations
app.use(express.static('public')); // to use public files
app.use(express.urlencoded({ extended: true })); // to parse req.body
app.use(express.json()); // to convert to json
app.use(methodOverride('_method')); // to use put or delete methods from form
app.use(session(sessionConfig)); // session (express-session middleware)
app.use(flash()); // for storing messages and cleared after being displayed to the user
app.use(passport.initialize()); // initialize passport
app.use(passport.session()); // to have persistent login sessions

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// middleware
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

// Routes
app.use('/', usersRoutes);
app.use('/tickets', ticketsRoutes);
app.use('/tickets/:id/comments', commentsRoutes);

// homepage
app.get('/', (req, res) => {
  res.render('home');
});

// show 404
app.all('*', (req, res, next) => {
  next(new ExpressError('Page Not Found', 404));
});

// error catch
app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = 'Oh no, something went wrong';
  res.status(statusCode).render('errors/error', { err });
});

app.listen(process.env.PORT, () => {
  console.log(`App running on port: ${process.env.PORT}`);
});
