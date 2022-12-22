const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../helpers/catchAsync');
const Ticket = require('../models/ticket');
const Comment = require('../models/comment');
const { isLoggedIn, isOwner, isCommentAuthor } = require('../middleware/auth');

// @description     Process Add comment form
// @route           POST tickets/
router.post(
  '/',
  isLoggedIn,
  catchAsync(async (req, res) => {
    const ticket = await Ticket.findById(req.params.id);
    const comment = new Comment(req.body.comment);
    comment.author = req.user._id;
    ticket.comments.push(comment);
    await comment.save();
    await ticket.save();
    req.flash('success', 'Comment posted');
    res.redirect(`/tickets/${ticket._id}`);
  })
);

// @description     Process Delete comment form
// @route           Delete tickets/commentId
router.delete(
  '/:commentId',
  isLoggedIn,
  isCommentAuthor,
  catchAsync(async (req, res) => {
    const { id, commentId } = req.params;
    await Ticket.findByIdAndUpdate(id, { $pull: { comments: commentId } });
    await Comment.findByIdAndDelete(commentId);
    req.flash('success', 'Comment deleted');
    res.redirect(`/tickets/${id}`);
  })
);

module.exports = router;
