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
