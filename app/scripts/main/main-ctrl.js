'use strict';

angular.module('karmaChameleon')
  .controller('MainCtrl', function ($scope, $http) {

    $http.get('/api/v1/posts').then( function(posts) {
      $scope.posts = posts.data;
    });

    $scope.createPost = function(e) {
      if (e.type !== 'click' && e.keyCode !== 13) {
        return;
      }
      var newPost = $scope.newPost;
      $http.post('/api/v1/post', newPost)
        .then( function(post) {
          $scope.posts.push(post.data);
          $scope.newPost = {};
        });
    };

    $scope.upVote = function(post) {
      $http.put('/api/v1/post/' + post._id + '/upVote')
        .then( function(postData) {
          $scope.posts[$scope.posts.indexOf(post)] = postData.data;
        });
    };

    $scope.downVote = function(post) {
      $http.put('/api/v1/post/' + post._id + '/downVote')
        .then( function(postData) {
          $scope.posts[$scope.posts.indexOf(post)] = postData.data;
        });
    };

    $scope.predicate = '-createdAt';

    $scope.sortClass = function(predicate) {
      return $scope.predicate === predicate ? 'active' : '';
    };
  });
