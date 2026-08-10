'use strict'

// Dummy verification script to confirm that npm's aliasing correctly
// resolves Microsoft's TypeScript 6/7 side-by-side migration pattern.
// Renovate should be able to track and update both aliased packages.
//
//   "typescript":         "npm:@typescript/typescript6@^6.0.1" (legacy JS compiler, bin: tsc6)
//   "@typescript/native": "npm:typescript@^7.0.1"              (native compiler, bin: tsc)
//
// Run with: npm run test:typescript-migration

const { execFileSync } = require('node:child_process')
const path = require('node:path')

const binDir = path.join(__dirname, '..', 'node_modules', '.bin')

const checks = [
  { label: 'typescript (legacy, aliased to @typescript/typescript6)', bin: 'tsc6' },
  { label: '@typescript/native (native, aliased to typescript)', bin: 'tsc' },
]

for (const { label, bin } of checks) {
  const binPath = path.join(binDir, bin)
  try {
    const version = execFileSync(binPath, ['--version'], { encoding: 'utf8' }).trim()
    console.log(`${label}: ${version} (${binPath})`)
  } catch (err) {
    console.error(`${label}: FAILED to invoke ${binPath}`)
    console.error(err.message)
    process.exitCode = 1
  }
}
