'use strict';

describe('Suggestion', function () {
  var validEvent = {
    keyCode: 13,
    shiftKey: false
  };

  var validEventWithShift = {
    keyCode: 13,
    shiftKey: true
  };

  var invalidEvent = {
    keyCode: 66,
    shiftKey: false
  };

  var suggestions = {
    data: [
      {
        id: '1',
        body: 'I think...',
        createdAt: new Date(),
        upVotes: 3,
        downVotes: 4
      },
      {
        id: '2',
        body: 'Instead of...',
        createdAt: new Date(),
        upVotes: 2,
        downVotes: 0
      }
    ]};
  var newSuggestion = { body: 'We should...' };
  beforeEach(module('karmaChameleon'));

  describe('controllers: SuggestionCtrl', function () {
    var SuggestionCtrl;
    var scope;
    var q;
    var deferred;

    var SuggestionSvc = {
      all: function () {
        deferred = q.defer();
        return deferred.promise;
      },
      save: function () {
        deferred = q.defer();
        return deferred.promise;
      }
    };

    beforeEach(inject(function($rootScope, $controller, $q) {
      q = $q;
      scope = $rootScope.$new();

      SuggestionCtrl = $controller('SuggestionCtrl', {
        $scope: scope,
        SuggestionSvc: SuggestionSvc
      });
    }));

    it('gets all suggestions and assigns to scope', function () {
      spyOn(SuggestionSvc, 'all').andCallThrough();
      SuggestionCtrl.init();
      deferred.resolve(suggestions.data);
      scope.$root.$digest();
      expect(SuggestionSvc.all).toHaveBeenCalled();
    });

    it('creates new suggestions', function() {
      spyOn(SuggestionSvc, 'save').andCallThrough();
      SuggestionCtrl.createSuggestion();
      deferred.resolve(newSuggestion);
      scope.$root.$digest();
      expect(SuggestionSvc.save).toHaveBeenCalled();
      expect(SuggestionCtrl.newSuggestion.body).toEqual('');
    });

    it('creates new suggestions given an enter keyCode', function () {
      spyOn(SuggestionSvc, 'save').andCallThrough();
      SuggestionCtrl.createSuggestion(validEvent);
      deferred.resolve(newSuggestion);
      scope.$root.$digest();
      expect(SuggestionSvc.save).toHaveBeenCalled();
      expect(SuggestionCtrl.newSuggestion.body).toEqual('');
    });

    it('does not create a new suggestion given an non-enter keyCode', function () {
      spyOn(SuggestionSvc, 'save').andCallThrough();
      SuggestionCtrl.createSuggestion(invalidEvent);
      deferred.resolve(newSuggestion);
      scope.$root.$digest();
      expect(SuggestionSvc.save).not.toHaveBeenCalled();
    });

    it('does not create a new suggestion given an enter keyCode with the shiftKey', function () {
      spyOn(SuggestionSvc, 'save').andCallThrough();
      SuggestionCtrl.createSuggestion(validEventWithShift);
      deferred.resolve(newSuggestion);
      scope.$root.$digest();
      expect(SuggestionSvc.save).not.toHaveBeenCalled();
    });
  });


  describe('service: SuggestionSvc', function () {
    var httpBackend;
    var SuggestionSvc;

    beforeEach(inject(function($httpBackend, _SuggestionSvc_) {
      httpBackend = $httpBackend;
      SuggestionSvc = _SuggestionSvc_;
    }));

    afterEach(function() {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
        SuggestionSvc.suggestions = [];
    });

    it('gets ALL suggestions from the server and resolves in the service', function () {
      httpBackend.expectGET('/api/v1/suggestions').respond(200, suggestions.data);
      SuggestionSvc.all();
      httpBackend.flush();
      expect(SuggestionSvc.suggestions).not.toEqual([]);
    });

    it('saves new suggestions', function () {
      httpBackend.expectPOST('/api/v1/suggestions', newSuggestion).respond(201, newSuggestion);
      var initialSuggestionCount = SuggestionSvc.suggestions.length;
      SuggestionSvc.save(newSuggestion);
      httpBackend.flush();
      expect(SuggestionSvc.suggestions.length).toEqual(initialSuggestionCount + 1);
    });
  });

});
