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

router.route('/post/:postId')
  .delete( function(req, res) {
    Post.remove({
      _id: req.params.postId
    }, function(err, post) {
      if (err) {
        res.status(500).send(err);
        return;
      }
      res.status(200).json( post );
    });
  });

router.get('/posts', function(req, res) {
  Post.find( function(err, posts) {
    if (err) {
      res.status(404).send(err);
    }
    res.status(200).json(posts);
  });
});

app.use('/api/v1', router);

app.listen(port);
console.log('Listening on port ' + port);
