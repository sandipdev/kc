'use strict';

angular.module('karmaChameleon')
  .controller('MainCtrl', function ($scope, $http) {

    $http.get('/api/v1/posts').then( function(posts) {
      $scope.posts = posts.data;
    });

    $scope.createPost = function(newPost) {
      $http.post('/api/v1/post', newPost)
        .then( function(post) {
          $scope.posts.push(post.data);
          $scope.newPost.body = '';
        });
    };

    $scope.deletePost = function(post) {
      var index = $scope.posts.indexOf(post);
      $scope.posts.splice(index, 1);
      $http.delete('/api/v1/post/' + post._id);
    };
  });
