# samsung-password

Decrypt email accounts passwords extracted from Samsung android devices.
[More information about how to extract the encrypted password.](https://github.com/lovasoa/samsung-email-password-decrypt)

## Usage

```js
var sp = require("samsung-password");

sp.decode("frNQWuOXBQGUiGDpIwhRIQ=="); // -> "password"

sp.encode("password"); // -> "frNQWuOXBQGUiGDpIwhRIQ=="
```

## Demo

 * [Test this library online](https://npm.runkit.com/samsung-password).
