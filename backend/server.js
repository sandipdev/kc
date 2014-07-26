'use strict';

var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');

app.use(bodyParser.json());
var port = process.env.PORT || 8080;

mongoose.connect('mongodb://localhost/karmaChameleon');

var Post = require('./app/models/post');

var router = express.Router();

router.get('/', function(req, res) {
  res.json({ message: 'Welcome to the API' });
});

router.get('/posts', function(req, res) {
  Post.find( function(err, posts) {
    if (err) {
      res.status(404).send(err);
    }
    res.status(200).json(posts);
  });
});

router.route('/post')
  .post( function(req, res) {
    var post = new Post();
    post.body = req.body.body;

    post.save( function(err) {
      if (err) {
        res.status(500).send(err);
        return;
      }
      res.status(201).json( post );
    });
  });

router.put('/post/:postId/upVote', function(req, res) {
  Post.findById(req.params.postId, function(err, post) {
    if (err) {
      res.status(404).send(err);
      return;
    }
    post.upVotes += 1;
    post.save();
    res.status(200).json(post);
  });
});

router.put('/post/:postId/downVote', function(req, res) {
  Post.findById(req.params.postId, function(err, post) {
    if (err) {
      res.status(404).send(err);
      return;
    }
    post.downVotes += 1;
    post.save();
    res.status(200).json(post);
  });
});

router.put('/post/:postid');

app.use('/api/v1', router);

app.listen(port);
console.log('Listening on port ' + port);
