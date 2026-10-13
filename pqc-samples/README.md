# PQC scanning samples

Deliberate cryptography for testing [scan-post-quantum-cryptography.yml](https://github.com/digicatapult/shared-workflows/blob/main/.github/workflows/scan-post-quantum-cryptography.yml). Nothing here is imported, executed, or copied into the Docker images, and its dependencies are not installed.

Expected results, checked locally with Semgrep 1.180.0 + pqc-rules, cryptoscan v1.4.0 and the correlator:

## crypto-samples.js

| Line | Sample                    | Semgrep         | cryptoscan | Code scanning             |
| ---- | ------------------------- | --------------- | ---------- | ------------------------- |
| 8    | RSA key pair              | `rsa`           | RSA        | Yes (corroborated)        |
| 9    | EC key pair               | `ec`            | ECC        | Yes (corroborated)        |
| 10   | ECDH                      | `ec`            | ECC        | Merged into line 9        |
| 11   | `jsonwebtoken` RS256      | `jwt-rsa`       | -          | Merged into line 8        |
| 12   | `jsonwebtoken` ES256      | `jwt-ecc`       | -          | Merged into line 9        |
| 17   | MD5                       | `md5`           | MD5        | Yes (corroborated)        |
| 18   | SHA-1                     | `sha1`          | SHA-1      | Yes (corroborated)        |
| 19   | AES-128-CBC               | -               | -          | No: neither tool flags it |
| 24   | WebCrypto RSA-OAEP        | `webcrypto-rsa` | RSA        | Yes (corroborated)        |
| 32   | ML-KEM-768 (quantum-safe) | `ml-kem` (INFO) | ML-KEM     | No: safe, artefacts only  |

## crypto_samples.py

| Line | Sample                | Semgrep              | cryptoscan | Code scanning                     |
| ---- | --------------------- | -------------------- | ---------- | --------------------------------- |
| 14   | RSA key               | `rsa`                | RSA        | Yes (corroborated)                |
| 15   | EC key                | `ec`                 | ECC        | Yes (corroborated)                |
| 16   | PyJWT RS256           | `jwt-rsa`            | -          | Merged into line 14               |
| 21   | MD5                   | `md5`                | MD5        | Yes (corroborated)                |
| 22   | SHA-1                 | `sha1`               | SHA-1      | Yes (corroborated)                |
| 28   | `ssl` minimum TLS 1.0 | `tls-legacy-version` | -          | No: single-source, artefacts only |

In total, 9 findings should reach code scanning.

cryptoscan also matches algorithm names in identifiers and imports (`js:13`, `js:20`, `py:10`, `py:23`). Within the line window these merge into the real findings; `py:10` (the `rsa` import) is single-source and stays in the artefacts.

Committed private keys are deliberately not seeded here: they would trip push protection and TruffleHog. The `cryptoscan:KEY-00*` allowlist is covered by the pqc-rules correlator fixtures instead.
