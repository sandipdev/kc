'use strict';

var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');

app.use(bodyParser.json());
var port = process.env.PORT || 8080;

mongoose.connect('mongodb://localhost/karmaChameleon');

var Suggestion = require('./app/models/suggestion');

var router = express.Router();

router.get('/', function(req, res) {
  res.json({ message: 'Welcome to the API' });
});

router.route('/suggestions')
  .get(function(req, res) {
    Suggestion.find( function(err, suggestions) {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).json(suggestions);
    });
  })
  .post(function(req, res) {
    var suggestion = new Suggestion();
    suggestion.body = req.body.body;

    suggestion.save( function(err) {
      if (err) {
        res.status(500).send(err);
        return;
      }
      res.status(201).json( suggestion );
    });
  });

app.use('/api/v1', router);

app.listen(port);
console.log('Listening on port ' + port);
