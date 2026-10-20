# PQC scanning samples

Deliberate cryptography for testing [scan-post-quantum-cryptography.yml](https://github.com/digicatapult/shared-workflows/blob/main/.github/workflows/scan-post-quantum-cryptography.yml). Nothing here is imported, executed, or copied into the Docker images, and its dependencies are not installed.

Expected results, checked locally with Semgrep 1.180.0, pqc-rules, cryptoscan v1.4.0, the correlator and the workflow's default allowlist:

## crypto-samples.js

| Line | Sample                    | Semgrep         | cryptoscan | Code scanning                                                |
| ---- | ------------------------- | --------------- | ---------- | ------------------------------------------------------------ |
| 8    | RSA key pair              | `rsa`           | RSA        | Yes (corroborated)                                           |
| 9    | EC key pair               | `ec`            | ECC        | Yes (corroborated)                                           |
| 10   | ECDH                      | `ec`            | ECC        | Yes (corroborated)                                           |
| 11   | `jsonwebtoken` RS256      | `jwt-rsa`       | -          | Yes (allowlisted, single-source)                             |
| 12   | `jsonwebtoken` ES256      | `jwt-ecc`       | ECC (l.13) | Yes (corroborated by an identifier match, see below)         |
| 17   | MD5                       | `md5`           | MD5        | Yes (corroborated)                                           |
| 18   | SHA-1                     | `sha1`          | SHA-1      | Yes (corroborated)                                           |
| 19   | AES-128-CBC               | -               | -          | No: intentionally not flagged (NIST: AES-128 remains secure) |
| 24   | WebCrypto RSA-OAEP        | `webcrypto-rsa` | RSA        | Yes (corroborated)                                           |
| 32   | ML-KEM-768 (quantum-safe) | `ml-kem` (INFO) | ML-KEM     | No: safe, artefacts only                                     |

## crypto_samples.py

| Line | Sample                | Semgrep              | cryptoscan | Code scanning                    |
| ---- | --------------------- | -------------------- | ---------- | -------------------------------- |
| 14   | RSA key               | `rsa`                | RSA        | Yes (corroborated)               |
| 15   | EC key                | `ec`                 | ECC        | Yes (corroborated)               |
| 16   | PyJWT RS256           | `jwt-rsa`            | -          | Yes (allowlisted, single-source) |
| 21   | MD5                   | `md5`                | MD5        | Yes (corroborated)               |
| 22   | SHA-1                 | `sha1`               | SHA-1      | Yes (corroborated)               |
| 28   | `ssl` minimum TLS 1.0 | `tls-legacy-version` | -          | Yes (allowlisted, single-source) |

In total, 13 findings should reach code scanning.

cryptoscan matches algorithm names as whole words, including identifiers and imports. These pattern-matching false positives either attach to the nearest Semgrep finding (`js:13` `ecToken` attaches to the ES256 JWT on line 12; `js:20` and `py:23` attach to the hash findings) or, with no Semgrep finding in range, stay single-source in the artefacts (`py:10`, the `rsa` import; `js:5`, the ML-KEM import).

Committed private keys are deliberately not seeded here: they would trip push protection and TruffleHog. The `cryptoscan:KEY-00*` allowlist is covered by the pqc-rules correlator fixtures instead.
