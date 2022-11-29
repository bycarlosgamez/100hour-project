const { render } = require('ejs');
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const connectDB = require('./config/database');
const Ticket = require('./models/ticket');

// Allows us to hace acces to varialves in our .env file
require('dotenv').config({ path: './config/.env' });

// Connects our DB to server
connectDB();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/createTicket', async (req, res) => {
  const ticket = new Ticket({
    title: 'First Test',
    description: 'this is a test',
    project: 'bug tracker',
    priority: 'low',
  });
  try {
    await ticket.save();
    res.send(ticket);
  } catch (err) {
    if (err) return res.status(500).send(err);
  }
});

app.listen(process.env.PORT, () => {
  console.log(`App running on port: ${process.env.PORT}`);
});
