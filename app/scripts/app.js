'use strict';

angular.module('karmaChameleon', [
  'ngAnimate',
  'ngCookies',
  'ngSanitize',
  'ui.router',
  'angularMoment']);

angular.module('karmaChameleon')
  .config(function ($locationProvider, $stateProvider, $urlRouterProvider) {
    $locationProvider.html5Mode(true);

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'partials/main.html',
        controller: 'MainCtrl'
      });

    $urlRouterProvider.otherwise('/');
  })
;
