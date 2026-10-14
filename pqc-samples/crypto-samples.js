// Deliberate cryptography samples for testing the post-quantum scanning workflow.
// Never imported or executed: see pqc-samples/README.md for the expected findings.
const crypto = require('node:crypto')
const jwt = require('jsonwebtoken')
const { ml_kem768 } = require('@noble/post-quantum/ml-kem')

function quantumVulnerable(payload, privateKey) {
  const rsaKeys = crypto.generateKeyPairSync('rsa', { modulusLength: 2048 })
  const ecKeys = crypto.generateKeyPairSync('ec', { namedCurve: 'prime256v1' })
  const ecdh = crypto.createECDH('prime256v1')
  const rsaToken = jwt.sign(payload, privateKey, { algorithm: 'RS256' })
  const ecToken = jwt.sign(payload, privateKey, { algorithm: 'ES256' })
  return { rsaKeys, ecKeys, ecdh, rsaToken, ecToken }
}

function classicallyWeak(data, key, iv) {
  const md5 = crypto.createHash('md5').update(data).digest('hex')
  const sha1 = crypto.createHash('sha1').update(data).digest('hex')
  const cipher = crypto.createCipheriv('aes-128-cbc', key, iv)
  return { md5, sha1, cipher }
}

async function webCrypto() {
  return globalThis.crypto.subtle.generateKey(
    { name: 'RSA-OAEP', modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]), hash: 'SHA-256' },
    true,
    ['encrypt', 'decrypt']
  )
}

function quantumSafe() {
  return ml_kem768.keygen()
}

module.exports = { quantumVulnerable, classicallyWeak, webCrypto, quantumSafe }
