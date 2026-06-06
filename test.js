var link = require(".");

var assert = require("node:assert/strict");
var test = require("node:test");

test("single To", function () {
  assert.equal(link("jane@example.com"), "mailto:jane@example.com");
});

test("multiple Tos", function () {
  assert.equal(
    link(["jane@example.com", "jill@example.com", "esmeralda@example.com"]),
    "mailto:jane@example.com,jill@example.com,esmeralda@example.com",
  );
});

test("one CC with no To", function () {
  assert.equal(link({ cc: "jane@example.com" }), "mailto:?cc=jane@example.com");
});

test("multiple CCs with no To", function () {
  assert.equal(
    link({ cc: ["jane@example.com", "jill@example.com"] }),
    "mailto:?cc=jane@example.com,jill@example.com",
  );
});

test("one CC with one To", function () {
  assert.equal(
    link("jill@example.com", { cc: "jane@example.com" }),
    "mailto:jill@example.com?cc=jane@example.com",
  );
});

test("one CC and one BCC", function () {
  assert.equal(
    link({
      cc: "jane@example.com",
      bcc: "esmeralda@example.com",
    }),
    "mailto:?cc=jane@example.com&bcc=esmeralda@example.com",
  );
});

test("subject", function () {
  assert.equal(
    link({
      subject: "Hello & welcome!",
    }),
    "mailto:?subject=Hello%20%26%20welcome!",
  );
});

test("body", function () {
  assert.equal(
    link({
      body: "Hello!\n...and welcome!",
    }),
    "mailto:?body=Hello!%0D%0A...and%20welcome!",
  );
});

test("the whole shebang", function () {
  assert.equal(
    link(["jane@example.com"], {
      cc: "jill@example.com",
      bcc: ["esmeralda@example.com"],
      subject: "Meet me at the café",
      body: "Hello!\n...and welcome!",
    }),
    [
      "mailto:jane@example.com?",
      "subject=Meet%20me%20at%20the%20caf%C3%A9&",
      "cc=jill@example.com&",
      "bcc=esmeralda@example.com&",
      "body=Hello!%0D%0A...and%20welcome!",
    ].join(""),
  );
});
