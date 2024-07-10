const express = require('express');
const router = express.Router();

const posts = require('../data/posts');
const error = require('../utilities/error');

router
  .route('/')
  .get((req, res) => {
    if (req.query.userId) {
      const userPosts = posts.filter((post) => post.userId == req.query.userId);
      res.json({ posts: userPosts });
    } else {
      const links = [
        {
          href: 'posts/:id',
          rel: ':id',
          type: 'GET',
        },
      ];

      res.json({ posts, links });
    }
  })
  .post((req, res, next) => {
    if (req.body.userId && req.body.title && req.body.content) {
      const post = {
        id: posts[posts.length - 1].id + 1,
        userId: req.body.userId,
        title: req.body.title,
        content: req.body.content,
      };

      posts.push(post);
      res.json(posts[posts.length - 1]);
    } else next(error(400, 'Insufficient Data'));
  });

router
  .route('/:id')
  .get((req, res, next) => {
    const post = posts.find((p) => p.id == req.params.id);

    const links = [
      {
        href: `/${req.params.id}`,
        rel: '',
        type: 'PATCH',
      },
      {
        href: `/${req.params.id}`,
        rel: '',
        type: 'DELETE',
      },
    ];

    if (post) res.json({ post, links });
    else next();
  })
  .patch((req, res, next) => {
    const post = posts.find((p, i) => {
      if (p.id == req.params.id) {
        for (const key in req.body) {
          posts[i][key] = req.body[key];
        }
        return true;
      }
    });

    if (post) res.json(post);
    else next();
  })
  .delete((req, res, next) => {
    const post = posts.find((p, i) => {
      if (p.id == req.params.id) {
        posts.splice(i, 1);
        return true;
      }
    });

    if (post) res.json(post);
    else next();
  });

router.route('/:id/comments').get((req, res, next) => {
  if (req.query.userId) {
    const userComments = comments.filter(
      (comment) => comment.userId == req.query.userId
    );
    res.json({ comments: userComments });
  } else {
    const postComments = comments.filter(
      (comment) => comment.postId == req.params.id
    );
    if (postComments.length === 0) {
      return next(error(404, 'No Comments Found'));
    }
    res.json({ comments: postComments });
  }
});

module.exports = router;
