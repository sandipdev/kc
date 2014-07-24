'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
  body     : { type: String, required: true, trim: true },
  createdAt: { type: Date, default: Date.now },
  upVotes  : { type: Number, min: 0, default: 0 },
  downVotes: { type: Number, min: 0, default: 0 }
});

PostSchema.virtual('score').get(function () {
  return this.upVotes - this.downVotes;
});

PostSchema.set('toJSON', { virtuals: true });

PostSchema.pre('save', function(next) {
  var now = new Date();
  if ( !this.createdAt ) {
    this.createdAt = now;
  }
  next();
});

module.exports = mongoose.model('Post', PostSchema);
