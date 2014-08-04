'use strict';

describe('The main view', function () {
  var textArea = element(by.model('ctrl.newSuggestion.body'));
  var submitButton = element(by.name('createSuggestionForm')).$('input[type=submit]');
  var suggestion = element.all(by.repeater('suggestion in ctrl.suggestions')).last().element(by.binding('suggestion.body'));

  beforeEach(function () {
    browser.get('http://localhost:3000');
  });

  it('should have the correct title', function () {
    expect(browser.getTitle()).toBe('Karma Chameleon');
  });

  it('allows visitors to suggest', function () {
    textArea.sendKeys('This is great!');
    submitButton.click();
    expect(suggestion.getText()).toBe('This is great!');
    expect(textArea.getAttribute('value')).toEqual('');
  });

  it('does not allow blank suggestions', function () {
    expect(submitButton.getAttribute('disabled')).toBeTruthy();
    textArea.sendKeys('I am not sure about this');
    expect(submitButton.getAttribute('disabled')).toBeFalsy();
    textArea.clear();
    expect(submitButton.getAttribute('disabled')).toBeTruthy();
  });

  it('does not allow short suggestions', function () {
    textArea.sendKeys('Hi there!');
    expect(submitButton.getAttribute('disabled')).toBeTruthy();
    textArea.sendKeys('!');
    expect(submitButton.getAttribute('disabled')).toBeFalsy();
  });
});
