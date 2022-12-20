const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../helpers/catchAsync');
const { isLoggedIn, isCommentAuthor } = require('../middleware/auth');
const commentsController = require('../controllers/comments');

// @description     Process Add comment form
// @route           POST tickets/
router.post('/', isLoggedIn, catchAsync(commentsController.createComment));

// @description     Process Delete comment form
// @route           Delete tickets/commentId
router.delete(
  '/:commentId',
  isLoggedIn,
  isCommentAuthor,
  catchAsync(commentsController.deleteComment)
);

module.exports = router;
