import { mkdtemp, cp, readFile, writeFile, rm, access } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { spawn } from 'node:child_process';

const rootDir = process.cwd();
const tempDir = await mkdtemp(path.join(os.tmpdir(), 'express-async-context-express4-'));

const copyEntries = [
  'src',
  'package.json',
  'jest.config.json',
  'tsconfig.json',
  'tsconfig.cjs.json',
  'eslint.config.mjs',
];

const run = (command, args, cwd) => new Promise((resolve, reject) => {
  const child = spawn(command, args, {
    cwd,
    stdio: 'inherit',
    shell: false,
  });

  child.on('exit', code => {
    if (code === 0) {
      resolve();
      return;
    }

    reject(new Error(`${command} ${args.join(' ')} exited with code ${code ?? 'unknown'}`));
  });

  child.on('error', reject);
});

try {
  for (const entry of copyEntries) {
    await cp(path.join(rootDir, entry), path.join(tempDir, entry), { recursive: true });
  }

  try {
    await access(path.join(rootDir, 'package-lock.json'));
    await cp(
      path.join(rootDir, 'package-lock.json'),
      path.join(tempDir, 'package-lock.json'),
      { recursive: false },
    );
  } catch {
    // No lockfile in the repo root is fine; npm will resolve in the temp workspace.
  }

  const packageJsonPath = path.join(tempDir, 'package.json');
  const packageJson = JSON.parse(await readFile(packageJsonPath, 'utf8'));

  packageJson.devDependencies = {
    ...packageJson.devDependencies,
    '@types/express': '^4.17.23',
    express: '^4.21.2',
  };

  await writeFile(packageJsonPath, `${JSON.stringify(packageJson, null, 2)}\n`);

  console.log(`Running tests in ${tempDir} with express@${packageJson.devDependencies.express}`);
  await run('npm', ['install'], tempDir);
  await run('npm', ['test'], tempDir);
} finally {
  await rm(tempDir, { recursive: true, force: true });
}
