import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
test('worker entrypoint exits successfully', () => {
    const entrypoint = fileURLToPath(new URL('../src/index.js', import.meta.url));
    execFileSync(process.execPath, [entrypoint]);
});
