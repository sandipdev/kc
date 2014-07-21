'use strict';

describe('controllers', function(){
  var scope;

  beforeEach(module('karmaChameleon'));

  beforeEach(inject(function($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should have the correct message', inject(function($controller) {
    expect(scope.awesomeThings).toBeUndefined();

    $controller('MainCtrl', {
      $scope: scope
    });

    expect(scope.message).toBe('Hello World');
  }));
});
