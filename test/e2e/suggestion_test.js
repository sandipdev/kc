'use strict';

describe('The main view', function () {
  var textArea = element(by.model('ctrl.newSuggestion.body'));
  var submitButton = element(by.name('createSuggestionForm')).$('input[type=submit]');
  var suggestions =  element.all(by.repeater('suggestion in ctrl.suggestions'));
  var lastSuggestion = suggestions.last().element(by.binding('suggestion.body'));

  beforeEach(function () {
    browser.get('http://localhost:3000');
  });

  it('has the correct title', function () {
    expect(browser.getTitle()).toBe('Karma Chameleon');
  });

  it('allows visitors to suggest', function () {
    textArea.sendKeys('This is great!');
    submitButton.click();
    expect(lastSuggestion.getText()).toContain('This is great!');
    expect(textArea.getAttribute('value')).toEqual('');
  });

  it('allows visitors to suggest by pressing enter', function () {
    textArea.sendKeys('I am about to press ENTER to suggest', protractor.Key.ENTER);
    expect(lastSuggestion.getText()).toContain('I am about to press ENTER to suggest');
    expect(textArea.getAttribute('value')).toEqual('');
  });

  it('does not suggest when visitors press shift + enter', function () {
    textArea.sendKeys('I want to keep writing,', protractor.Key.chord(protractor.Key.SHIFT, protractor.Key.ENTER));
    expect(textArea.getAttribute('value')).toEqual('I want to keep writing,\n');
  })

  it('displays how long ago a suggestion was made', function () {
    textArea.sendKeys('I just made this suggestion.');
    submitButton.click();
    expect(lastSuggestion.$('.time-ago').getText()).toEqual('a few seconds ago');
    expect(lastSuggestion.$('.time-ago').getAttribute('title')).toContain('Today');
  });

  it('does not allow blank or short suggestions', function () {
    expect(submitButton.isEnabled()).toBeFalsy();
    textArea.sendKeys('Hi there!');
    expect(submitButton.isEnabled()).toBeFalsy();
    textArea.clear();
    expect(submitButton.isEnabled()).toBeFalsy();
    textArea.sendKeys('I am not sure about this');
    expect(submitButton.isEnabled()).toBeTruthy();
  });

  it('allows users to upvote a suggesiton but only once', function () {
    textArea.sendKeys('[Insert idea is worth upvoting]', protractor.Key.ENTER);
    suggestions.last().$('.upvote').click();
    expect(suggestions.last().element(by.binding('suggestion.score')).getText()).toEqual('1');
    suggestions.last().$('.upvote').click();
    expect(suggestions.last().element(by.binding('suggestion.score')).getText()).toEqual('1');
  });

});
