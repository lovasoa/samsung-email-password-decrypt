# samsung-email-password-decrypt

Decrypt encrypted passwords in `EmailProvider.db` on samsung phones.

## How to recover your IMAP/POP/SMTP passwords from a samsung phone ?

  1. Root the phone.
  2. Extract the sqlite database file `/data/user/0/com.android.email/databases/EmailProvider.db`.
  3. In the database, extract the encrypted password from the `HostAuth` table.
  4. Use one of the tools of this repo to decipher the password.

## Technical explanation

In stock android versions, the password is stored in plain text in the database.
Samsung decided to encrypt this password, but they use the same decryption key
on all phones.

The password found in the database is a base64 representation of the original
password encoded with AES 128 CBC, using an empty initialization vector and the
following key: `0ea7923ecc6e979f633d0415a1e20871`.

The key itself is the result of a PBKDF2 key derivation with the following parameters:
  * Password: `(qlBxn2qlB!ro@qkf?)`,
  * Salt: `samsung_sec_salt`,
  * Number of iterations: `100`,
  * Key length: `128` bits,
  * Hash algorithm: `SHA1`.
