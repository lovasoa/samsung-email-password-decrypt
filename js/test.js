var assert = require("assert");
var sp = require("./samsung-password.js")

assert.equal(
  sp.decode("frNQWuOXBQGUiGDpIwhRIQ=="),
  "password",
  "Decoding 'password'");

for (var i=0; i<1e5; i++) {
  var pass = i.toString(36);
  assert.equal(
    sp.decode(sp.encode(pass)),
    pass,
    "Encoding and decoding: "+pass);
}
