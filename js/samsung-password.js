const crypto = require("crypto");

function samsungPasswordDecode(encrypted) {
  const decipher = crypto.createDecipheriv(
    "aes-128-cbc-hmac-sha1",
    new Uint8Array([14,-89,-110,62,-52,110,-105,-97,99,61,4,21,-95,-30,8,113]),
    new Uint8Array(16)
   );
  let decrypted = decipher.update(encrypted, 'base64', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

module.exports.decode = samsungPasswordDecode;
