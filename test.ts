import { mailtolink as link } from "./mailtolink.ts";
import assert from "node:assert/strict";
import test from "node:test";

test("single To", () => {
  assert.equal(link("jane@example.com"), "mailto:jane@example.com");
});

test("multiple Tos", () => {
  assert.equal(
    link(["jane@example.com", "jill@example.com", "esmeralda@example.com"]),
    "mailto:jane@example.com,jill@example.com,esmeralda@example.com",
  );
});

test("one CC with no To", () => {
  assert.equal(link({ cc: "jane@example.com" }), "mailto:?cc=jane@example.com");
});

test("multiple CCs with no To", () => {
  assert.equal(
    link({ cc: ["jane@example.com", "jill@example.com"] }),
    "mailto:?cc=jane@example.com,jill@example.com",
  );
});

test("one CC with one To", () => {
  assert.equal(
    link("jill@example.com", { cc: "jane@example.com" }),
    "mailto:jill@example.com?cc=jane@example.com",
  );
});

test("one CC and one BCC", () => {
  assert.equal(
    link({
      cc: "jane@example.com",
      bcc: "esmeralda@example.com",
    }),
    "mailto:?cc=jane@example.com&bcc=esmeralda@example.com",
  );
});

test("subject", () => {
  assert.equal(
    link({
      subject: "Hello & welcome!",
    }),
    "mailto:?subject=Hello%20%26%20welcome!",
  );
});

test("body", () => {
  assert.equal(
    link({
      body: "Hello!\n...and welcome!",
    }),
    "mailto:?body=Hello!%0D%0A...and%20welcome!",
  );
});

test("percent sign in local part of to address", () => {
  assert.equal(
    link("gorby%kremvax@example.com"),
    "mailto:gorby%25kremvax@example.com",
  );
});

test("question mark in local part of to address", () => {
  assert.equal(
    link("unlikely?address@example.com"),
    "mailto:unlikely%3Faddress@example.com",
  );
});

test("ampersand in local part of to address", () => {
  assert.equal(
    link("Mike&family@example.org"),
    "mailto:Mike%26family@example.org",
  );
});

test("plus sign in local part of to address", () => {
  assert.equal(link("bill+ietf@example.org"), "mailto:bill%2Bietf@example.org");
});

test("quoted local part containing @ sign", () => {
  assert.equal(
    link('"not@me"@example.org'),
    "mailto:%22not%40me%22@example.org",
  );
});

test("internationalized domain in to address", () => {
  assert.equal(
    link("user@\u7D0D\u8C46.example.org"),
    "mailto:user@%E7%B4%8D%E8%B1%86.example.org",
  );
});

test("ampersand in local part of cc address", () => {
  assert.equal(
    link({ cc: "Mike&family@example.org" }),
    "mailto:?cc=Mike%26family@example.org",
  );
});

test("body with CRLF line endings", () => {
  assert.equal(
    link({ body: "Hello\r\nWorld" }),
    "mailto:?body=Hello%0D%0AWorld",
  );
});

test("body with CR-only line endings", () => {
  assert.equal(link({ body: "Hello\rWorld" }), "mailto:?body=Hello%0D%0AWorld");
});

test("the whole shebang", () => {
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
