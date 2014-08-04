'use strict';

angular.module('karmaChameleon')
  .controller('SuggestionCtrl', SuggestionCtrl);

/* @ngInject */
function SuggestionCtrl(SuggestionSvc) {
  var vm = this;
  vm.suggestions = SuggestionSvc.suggestions;
  vm.newSuggestion = {};

  vm.init = function () {
    SuggestionSvc.all()
    .then(function () {
      vm.suggestions = SuggestionSvc.suggestions;
    });
  };

  vm.createSuggestion = function(e) {
    if (angular.isDefined(e) && (e.keyCode !== 13 || e.shiftKey)) {
      return;
    }
    SuggestionSvc.save(vm.newSuggestion)
      .then(function () {
        vm.newSuggestion.body = '';
        vm.suggestions = SuggestionSvc.suggestions;
      });
  };

  vm.init();
}
