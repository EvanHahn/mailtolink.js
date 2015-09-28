mailtolink.js
=============

Makes `mailto:` links.

In the browser:

```html
<script src="mailtolink.js"></script>
<script>
// Set the .email-link's href to "mailto:esmeralda@example.com".
var emailLink = document.querySelector('a.email-link');
emailLink.href = mailtoLink('esmeralda@example.com');
</script>
```

In a CommonJS environment like Node or Browserify:

```js
var mailtoLink = require('mailtolink');
console.log(mailtoLink('esmeralda@example.com'));
```
