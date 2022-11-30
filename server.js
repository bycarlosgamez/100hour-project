const { render } = require('ejs');
const express = require('express');
const app = express();
const path = require('path');
const connectDB = require('./config/database');
const Ticket = require('./models/ticket');

// Allows us to hace acces to varialves in our .env file
require('dotenv').config({ path: './config/.env' });

// Connects our DB to server
connectDB();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public')); // to use public files
app.use(express.urlencoded({ extended: true })); // to parse req.body
app.use(express.json()); // to convert to json

// homepage
app.get('/', (req, res) => {
  res.render('home');
});

// see all tickets
app.get('/tickets', async (req, res) => {
  const tickets = await Ticket.find({});
  res.render('tickets/index', { tickets });
});

// create new ticket
app.get('/tickets/new', (req, res) => {
  res.render('tickets/new');
});

app.post('/tickets', async (req, res) => {
  const ticket = new Ticket(req.body.ticket);
  await ticket.save();
  res.redirect(`/tickets/${ticket._id}`);
});

// see individual ticket by id
app.get('/tickets/:id', async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);
  res.render('tickets/show', { ticket });
});

app.listen(process.env.PORT, () => {
  console.log(`App running on port: ${process.env.PORT}`);
});
