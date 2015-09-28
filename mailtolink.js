(function () {
  function mailtoLink(to, options) {
    var result = ['mailto:'];

    if (isString(to) || Array.isArray(to)) {
      result.push(to);
    } else {
      options = to;
    }

    var queryString = [];
    if (options) {
      if (options.subject) {
        queryString.push('subject=' + encodeURIComponent(options.subject));
      }
      if (options.cc) {
        queryString.push('cc=' + options.cc);
      }
      if (options.bcc) {
        queryString.push('bcc=' + options.bcc);
      }
      if (options.body) {
        queryString.push('body=' + encodeURIComponent(options.body).replace(/%0A/g, '%0D%0A'));
      }

      if (queryString.length) {
        result.push('?', queryString.join('&'));
      }
    }

    return result.join('');
  }

  function isString(value) {
    return Object.prototype.toString.call(value) === '[object String]';
  }

  if (typeof module !== 'undefined') {
    module.exports = mailtoLink;
  } else {
    this.mailtoLink = mailtoLink;
  }
})();
