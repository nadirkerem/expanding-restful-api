const express = require('express');
const router = express.Router();

const comments = [];
const posts = require('../data/posts');
const users = require('../data/users');
const error = require('../utilities/error');

const generateId = () => {
  return comments.length > 0 ? comments[comments.length - 1].id + 1 : 1;
};

router.post('/', (req, res, next) => {
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

module.exports = router;
