'use strict';

var express      = require('express');
var app          = express();
var bodyParser   = require('body-parser');
var mongoose     = require('mongoose');
var session      = require('express-session');
var MongoStore   = require('connect-mongo')(session);

app.use(bodyParser.json());
app.use(session({
  secret: 'secret',
  store: new MongoStore({
    db: 'karmaChameleon'
  }),
  cookie: { maxAge: 6000 },
  resave: true,
  saveUninitialized: true
}));
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

router.route('/suggestions/:suggestionId/:voteAction(up|down)')
  .post(function(req, res) {
    var session = req.session;
    var suggestionId = req.params.suggestionId;
    var voteAction = req.params.voteAction + 'Votes';
    var voteObj = {};
    voteObj[voteAction] = 1;

    if (session[suggestionId]) {
      res.status(304).end();
      return;
    } else {
      session[suggestionId] = req.params.voteAction;
      Suggestion.findByIdAndUpdate(suggestionId, { $inc: voteObj }, function (err, suggestion) {
          res.send(suggestion);
      });
    }
  });


app.use('/api/v1', router);

app.listen(port);
console.log('Listening on port ' + port);
