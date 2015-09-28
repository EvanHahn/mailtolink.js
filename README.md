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

Examples
--------

Generate a link for one email address:

```js
mailtoLink('esmeralda@example.com')
// => mailto:esmeralda@example.com
```

Generate a link for multiple email addresses:

```js
mailtoLink(['esmeralda@example.com', 'victoria@example.com'])
// => mailto:esmeralda@example.com,victoria@example.com
```

Generate a link with an email and a subject:

```js
mailtoLink('esmeralda@example.com', { subject: '¡Hola!' })
// => mailto:esmeralda@example.com?subject=%C2%A1Hola!
```

Generate a link with just a subject:

```js
mailtoLink({ subject: '¡Hola!' })
// => mailto:?subject=%C2%A1Hola!
```

Generate a link with a subject and a body:

```js
mailtoLink({
  subject: 'Check out this photo',
  body: [
    'I thought you might really enjoy this photo of a store I found:',
    '',
    'http://example.com/tienda.jpg',
  ].join('\n')
})
// => mailto:?subject=Check%20out%20this%20photo&body=I%20thought%20you%20might%20really%20enjoy%20this%20photo%20of%20a%20store%20I%20found%3A%0D%0A%0D%0Ahttp%3A%2F%2Fexample.com%2Ftienda.jpg'
```

Generate a link with an email, a subject, a CC, a body, and some BCCs:

```js
mailtoLink('esmeralda@example.com', {
  subject: 'Hi',
  cc: 'victoria@example.com',
  bcc: ['mom@example.com', 'dad@example.com'],
  body: 'Hope you are doing well.'
})
// => mailto:esmeralda@example.com?subject=Hi&cc=victoria@example.com&bcc=mom@example.com,dad@example.com&body=Hope%20you%20are%20doing%20well.
```
