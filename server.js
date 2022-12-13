const express = require('express');
const app = express();
const path = require('path');
const ejsmate = require('ejs-mate');
const ExpressError = require('./helpers/ExpressError');
const methodOverride = require('method-override');
const session = require('express-session');
const connectDB = require('./config/database');

// Routers
const tickets = require('./routes/tickets');
const comments = require('./routes/comments');

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

// Allows us to hace acces to varialves in our .env file
require('dotenv').config({ path: './config/.env' });

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
app.use(session(sessionConfig)); // Session (express-session middleware)

// Routes
app.use('/tickets', tickets);
app.use('/tickets/:id/comments', comments);

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
