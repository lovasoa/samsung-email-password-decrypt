const crypto = require("crypto");

var ALGO = "aes-128-cbc"; 
var KEY = crypto.pbkdf2Sync(
  "(qlBxn2qlB!ro@qkf?)", "samsung_sec_salt", 100, 16, "sha1");
var IV = Buffer.alloc(16);


module.exports = {
  "KEY": KEY,
  "decode": function samsungPasswordDecode(encrypted) {
    var decipher = crypto.createDecipheriv(ALGO, KEY, IV);
    var decrypted = decipher.update(encrypted, 'base64', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  },
  "encode": function samsungPasswordEncode(raw) {
    var cipher = crypto.createCipheriv(ALGO, KEY, IV);
    var encrypted = cipher.update(raw, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return encrypted;
  },
};

