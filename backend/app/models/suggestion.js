'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SuggestionSchema = new Schema({
  body     : { type: String, required: true, trim: true },
  createdAt: { type: Date, default: Date.now },
  upVotes  : { type: Number, min: 0, default: 0 },
  downVotes: { type: Number, min: 0, default: 0 }
});

module.exports = mongoose.model('Suggestion', SuggestionSchema);
