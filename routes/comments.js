const express = require('express');
const router = express.Router();

const comments = [];
const posts = require('../data/posts');
const users = require('../data/users');
const error = require('../utilities/error');

const generateId = () => {
  return comments.length > 0 ? comments[comments.length - 1].id + 1 : 1;
};

router
  .route('/')
  .get((req, res, next) => {
    if (req.query.userId) {
      const userComments = comments.filter(
        (comment) => comment.userId == req.query.userId
      );
      res.json({ comments: userComments });
    } else if (req.query.postId) {
      const postComments = comments.filter(
        (comment) => comment.postId == req.query.postId
      );
      res.json({ comments: postComments });
    } else {
      if (comments.length === 0) {
        return next(error(404, 'No Comments Found'));
      }
      res.json({ comments });
    }
  })
  .post((req, res, next) => {
    const { userId, postId, body } = req.body;

    if (!userId || !postId || !body) {
      return next(error(400, 'Invalid Comment'));
    }

    const userExists = users.some((user) => user.id == userId);
    const postExists = posts.some((post) => post.id == postId);

    if (!userExists) {
      return next(error(400, 'Invalid userId'));
    }

    if (!postExists) {
      return next(error(400, 'Invalid postId'));
    }

    const comment = {
      id: generateId(),
      userId,
      postId,
      body,
    };

    comments.push(comment);

    res.status(201).json(comment);
  });

router
  .route('/:id')
  .get((req, res, next) => {
    const comment = comments.find((comment) => comment.id == req.params.id);

    if (!comment) {
      return next(error(404, 'Comment not found'));
    }

    res.json(comment);
  })
  .patch((req, res, next) => {
    const comment = comments.find((comment) => comment.id == req.params.id);

    if (!comment) {
      return next(error(404, 'Comment not found'));
    }

    const { body } = req.body;

    if (!body) {
      return next(error(400, 'Invalid Comment'));
    }

    comment.body = body;

    res.json(comment);
  })
  .delete((req, res, next) => {
    const commentIndex = comments.findIndex(
      (comment) => comment.id == req.params.id
    );

    if (commentIndex === -1) {
      return next(error(404, 'Comment not found'));
    }

    comments.splice(commentIndex, 1);

    res.status(204).send();
  });

module.exports = router;
