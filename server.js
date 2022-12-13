const express = require('express');
const app = express();
const path = require('path');
const ejsmate = require('ejs-mate');
const catchAsync = require('./helpers/catchAsync');
const ExpressError = require('./helpers/ExpressError');
const methodOverride = require('method-override');
const connectDB = require('./config/database');
const Ticket = require('./models/ticket');
const Comment = require('./models/comment');

// Routers
const tickets = require('./routes/tickets');
const comments = require('./routes/comments');

// Allows us to hace acces to varialves in our .env file
require('dotenv').config({ path: './config/.env' });

// Connects our DB to server
connectDB();

app.engine('ejs', ejsmate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public')); // to use public files
app.use(express.urlencoded({ extended: true })); // to parse req.body
app.use(express.json()); // to convert to json
app.use(methodOverride('_method')); // to use put or delete methods from form

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
