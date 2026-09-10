const { execFileSync } = require('node:child_process');
const path = require('node:path');
const test = require('node:test');

test('portal entrypoint parses', () => {
  execFileSync(process.execPath, ['--check', path.join(__dirname, '..', 'src', 'index.js')]);
});