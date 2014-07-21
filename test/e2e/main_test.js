'use strict';

describe('The main view', function () {

  beforeEach(function () {
    browser.get('http://localhost:3000');
  });

  it('should have the correct title', function () {
    expect(browser.getTitle()).toBe('Karma Chameleon');
  });

});
