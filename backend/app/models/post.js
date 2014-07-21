'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
  body: { type: String, required: true, trim: true },
  createdAt : { type: Date }
});

PostSchema.pre('save', function(next) {
  var now = new Date();
  if ( !this.createdAt ) {
    this.createdAt = now;
  }
  next();
});

module.exports = mongoose.model('Post', PostSchema);
