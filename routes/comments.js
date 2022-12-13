const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../helpers/catchAsync');
const Ticket = require('../models/ticket');
const Comment = require('../models/comment');

// add ticket comments
router.post(
  '/',
  catchAsync(async (req, res) => {
    const ticket = await Ticket.findById(req.params.id);
    const comment = new Comment(req.body.comment);
    ticket.comments.push(comment);
    await comment.save();
    await ticket.save();
    res.redirect(`/tickets/${ticket._id}`);
  })
);

// delete ticket comment
router.delete(
  '/:commentId',
  catchAsync(async (req, res) => {
    const { id, commentId } = req.params;
    await Ticket.findByIdAndUpdate(id, { $pull: { comments: commentId } });
    await Comment.findByIdAndDelete(commentId);
    res.redirect(`/tickets/${id}`);
  })
);

module.exports = router;
