const express = require('express');
const router = express.Router();
const catchAsync = require('../helpers/catchAsync');
const { isLoggedIn, isOwner } = require('../middleware/auth');
const ticketsController = require('../controllers/tickets');
const multer = require('multer');
const { storage } = require('../middleware/cloudinary');
const upload = multer({ storage });

// @description     Show all available tickets
// @route           GET /tickets
router.get('/', isLoggedIn, catchAsync(ticketsController.getTickets));

// @description     Process Create ticket form
// @route           POST /tickets
router.post(
  '/',
  isLoggedIn,
  upload.array('attachement'),
  catchAsync(ticketsController.createTicket)
);

// @description     Show new ticket page
// @route           GET /tickets/new
router.get('/new', isLoggedIn, ticketsController.createTicketForm);

// @description     Show individual ticket page by id
// @route           GET /tickets/:id
router.get('/:id', isLoggedIn, catchAsync(ticketsController.showTicket));

// @description     Show edit ticket page
// @route           GET /tickets/:id/edit
router.get(
  '/:id/edit',
  isLoggedIn,
  isOwner,
  catchAsync(ticketsController.editTicketForm)
);

// @description     Process Edit ticket form
// @route           PUT /tickets/:id/
router.put(
  '/:id',
  isLoggedIn,
  isOwner,
  upload.array('attachement'),
  catchAsync(ticketsController.editTicket)
);

// @description     Process Delete ticket form
// @route           DELETE /tickets/:id/
router.delete(
  '/:id',
  isLoggedIn,
  isOwner,
  catchAsync(ticketsController.deleteTicket)
);

module.exports = router;
