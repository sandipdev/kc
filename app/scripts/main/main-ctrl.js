'use strict';

angular.module('karmaChameleon')
  .controller('MainCtrl', function ($scope, $http) {
    $http.get('/api/v1/posts')
      .then( function(posts) {
        $scope.posts = posts.data;
      });
    $scope.newPost = { body: '' };
    $scope.createPost = function(newPost) {
      $http.post('/api/v1/post', newPost)
        .success( function(post) {
          $scope.posts.push(post);
        });
      $scope.newPost = { body: '' };
    };
    $scope.deletePost = function(index, post) {
      $http.delete('/api/v1/post/' + post._id)
        .success( function() {
          $scope.posts.splice(index, 1);
        });
    };
  });
