'use strict';

angular.module('karmaChameleon')
  .service('SuggestionSvc', SuggestionSvc);

/* @ngInject */
function SuggestionSvc(Restangular) {
  var _baseSuggestions = Restangular.all('suggestions');
  var _suggestions = [];

  var model = this;
  model.all = all;
  model.save = save;

  function all() {
    return _baseSuggestions.getList()
    .then(function(data) {
      model.suggestions = data;
    });
  }

  function save(newSuggestion) {
    return _baseSuggestions.post(newSuggestion)
    .then(function(data) {
      model.suggestions.push(data);
    });
  }

  Object.defineProperty(model, 'suggestions', {
    enumerable: true,
    configurable: true,
    get: function () { return _suggestions; },
    set: function (value) { _suggestions = value; }
  });
}
