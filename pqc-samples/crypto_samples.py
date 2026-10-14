"""Deliberate cryptography samples for testing the post-quantum scanning workflow.

Never imported or executed: see pqc-samples/README.md for the expected findings.
"""

import hashlib
import ssl

import jwt
from cryptography.hazmat.primitives.asymmetric import ec, rsa


def quantum_vulnerable(payload: dict, private_key: str) -> tuple:
    rsa_key = rsa.generate_private_key(public_exponent=65537, key_size=2048)
    ec_key = ec.generate_private_key(ec.SECP256R1())
    token = jwt.encode(payload, private_key, algorithm="RS256")
    return rsa_key, ec_key, token


def classically_weak(data: bytes) -> tuple:
    md5 = hashlib.md5(data).hexdigest()
    sha1 = hashlib.sha1(data).hexdigest()
    return md5, sha1


def weak_tls() -> ssl.SSLContext:
    context = ssl.SSLContext(ssl.PROTOCOL_TLS_CLIENT)
    context.minimum_version = ssl.TLSVersion.TLSv1
    return context
