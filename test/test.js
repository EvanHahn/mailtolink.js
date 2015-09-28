var link = require('..');

var assert = require('assert');

describe('mailtolink builder supports', function () {
  it('single To', function () {
    assert.equal(link('jane@example.com'), 'mailto:jane@example.com');
  });

  it('multiple Tos', function () {
    assert.equal(link([
      'jane@example.com',
      'jill@example.com',
      'esmeralda@example.com'
    ]), 'mailto:jane@example.com,jill@example.com,esmeralda@example.com');
  });

  it('one CC with no To', function () {
    assert.equal(link({ cc: 'jane@example.com' }), 'mailto:?cc=jane@example.com');
  });

  it('multiple CCs with no To', function () {
    assert.equal(link({ cc: [
      'jane@example.com',
      'jill@example.com'
    ]}), 'mailto:?cc=jane@example.com,jill@example.com');
  });

  it('one CC with one To', function () {
    assert.equal(link('jill@example.com', { cc: 'jane@example.com' }), 'mailto:jill@example.com?cc=jane@example.com');
  });

  it('one CC and one BCC', function () {
    assert.equal(link({
      cc: 'jane@example.com',
      bcc: 'esmeralda@example.com'
    }), 'mailto:?cc=jane@example.com&bcc=esmeralda@example.com');
  });

  it('subject', function () {
    assert.equal(link({
      subject: 'Hello & welcome!'
    }), 'mailto:?subject=Hello%20%26%20welcome!');
  });

  it('body', function () {
    assert.equal(link({
      body: 'Hello!\n...and welcome!'
    }), 'mailto:?body=Hello!%0D%0A...and%20welcome!');
  });

  it('the whole shebang', function () {
    assert.equal(link(['jane@example.com'], {
      cc: 'jill@example.com',
      bcc: ['esmeralda@example.com'],
      subject: 'Meet me at the café',
      body: 'Hello!\n...and welcome!'
    }), [
      'mailto:jane@example.com?',
      'subject=Meet%20me%20at%20the%20caf%C3%A9&',
      'cc=jill@example.com&',
      'bcc=esmeralda@example.com&',
      'body=Hello!%0D%0A...and%20welcome!'
    ].join(''));
  });
});
