'use strict';

angular.module('karmaChameleon', [
  'ngAnimate',
  'ngCookies',
  'ngSanitize',
  'ui.router',
  'angularMoment',
  'restangular']);

/* @ngInject */
angular.module('karmaChameleon')
  .config(function ($locationProvider, $stateProvider, $urlRouterProvider) {
    $locationProvider.html5Mode(true);

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'partials/suggestion.html',
        controller: 'SuggestionCtrl',
        controllerAs: 'ctrl'
      });

    $urlRouterProvider.otherwise('/');
  });

/* @ngInject */
angular.module('karmaChameleon')
  .config(function (RestangularProvider) {
    RestangularProvider.setBaseUrl('/api/v1');
    RestangularProvider.setRestangularFields({
      id: '_id'
    });
  });
